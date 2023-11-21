const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const fs = require('fs')

const ON_DEATH = require('death')({uncaughtException: true})
const os = require('os')
const prod = os.hostname() == 'agilesimulations' ? true : false
const logFile = 'server.log'
const port = 4103
const siteCollection = 'maykindSite'
const propertyCollection = 'maykindProperties'

ON_DEATH((signal, err) => {
  let logStr = new Date()
  if (signal) {
    logStr = logStr + ' ' + signal + '\n'
  }
  if (err && err.stack) {
    logStr = logStr + '  ' + err.stack + '\n'
  }
  fs.appendFile(logFile, logStr, (err) => {
    if (err) console.log(logStr)
    process.exit()
  })
})

global.TextEncoder = require("util").TextEncoder
global.TextDecoder = require("util").TextDecoder

let httpServer
let io
if (!prod) {
  const express = require('express')
  const app = express()
  httpServer = require('http').createServer(app)
  io = require('socket.io')(httpServer, {
    cors: {
      origins: ['http://localhost:*'],
      methods: ['GET', 'POST'],
      credentials: true
    }
  })
} else {
  const options = {
    key: fs.readFileSync('/etc/ssl/private/agilesimulations.co.uk.key'),
    cert: fs.readFileSync('/etc/ssl/certs/agilesimulations.cer')
  }
  httpServer = require('https').createServer(options)
  io = require('socket.io')(httpServer, {
    cors: {
      origins: ['https://agilesimulations.co.uk'],
      methods: ['GET', 'POST'],
      credentials: true
    }
  })
}

const dbStore = require('./store/dbStore.js')

const MongoClient = require('mongodb').MongoClient

const url = prod ? 'mongodb://127.0.0.1:27017/' : 'mongodb://localhost:27017/'
const maxIdleTime = 7200000
const connectDebugOff = prod
const debugOn = true // !prod

const connections = {}
const maxConnections = 2000

const emit = (event, data) => {
  if (debugOn) {
    console.log(event, data, '(emit)')
  }
  io.emit(event, data)
}

let db
MongoClient.connect(url, { useUnifiedTopology: true, maxIdleTimeMS: maxIdleTime }, (err, client) => {
  if (err) throw err
  db = client.db('db')

  db.createCollection(propertyCollection, function(error, collection) {})
  db.createCollection(siteCollection, function(error, collection) {})

  db.propertyCollection = db.collection(propertyCollection)
  db.siteCollection = db.collection(siteCollection)

  io.on('connection', (socket) => {
    const connection = socket.handshake.headers.host
    connections[connection] = connections[connection] ? connections[connection] + 1 : 1
    if (Object.keys(connections).length > maxConnections || connections[connection] > maxConnections) {
      console.log(`Too many connections. Socket ${socket.id} closed`)
      socket.disconnect(0)
    } else {
      connectDebugOff || console.log(`A user connected with socket id ${socket.id} from ${connection} - ${connections[connection]} connections. (${Object.keys(connections).length} clients)`)
      emit('updateConnections', {connections: connections, maxConnections: maxConnections})
    }

    socket.on('disconnect', () => {
      const connection = socket.handshake.headers.host
      connections[connection] = connections[connection] - 1
      connectDebugOff || console.log(`User with socket id ${socket.id} has disconnected.`)
      emit('updateConnections', {connections: connections, maxConnections: maxConnections})
    })

    // Site

    socket.on('sendGetDescriptions', (data) => { dbStore.getDescriptions(db, io, data, debugOn) })

    socket.on('sendUpdateDescription', (data) => { dbStore.updateDescription(db, io, data, debugOn) })

    // Properties

    socket.on('sendGetProperties', (data) => { console.log('sendGetProperties'); dbStore.getProperties(db, io, data, debugOn) })

    socket.on('sendUpdateLive', (data) => { dbStore.updateLive(db, io, data, debugOn) })

    socket.on('sendCreateProperty', (data) => { console.log('sendCreateProperty'); dbStore.createProperty(db, io, data, debugOn) })

    socket.on('sendUpdateProperty', (data) => { dbStore.updateProperty(db, io, data, debugOn) })

    socket.on('sendDeleteProperty', (data) => { dbStore.deleteProperty(db, io, data, debugOn) })

    socket.on('sendUploadFile', (data) => { dbStore.uploadFile(db, io, data, debugOn) })
  })
})

httpServer.listen(port, () => {
  console.log('Listening on *:' + port)
})
