
const path = require('path')
const fs = require('fs');

module.exports = {

  testMessage: function(db, io, data, debugOn, updating) {

    if (debugOn) { console.log('testMessage', data) }

    const res = {
      source: data.source,
      date: new Date().toISOString(),
      message: data.message
    }
    db.gameCollection.insertOne(res, (err) => {
      if (err) throw err
      io.emit('testMessage', res)
    })
  },

  writeFile: function(db, io, data, debugOn, updating) {

    if (debugOn) { console.log('writeFile', data) }

    fs.writeFile(__dirname + '/../assets/' + data.name, data.content, err => {
      if (err) {
        console.error(err);
      } else {
        io.emit('fileUploaded', {filename: data.name})

      }
    })
  }
}
