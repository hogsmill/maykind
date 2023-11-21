
const { v4: uuidv4 } = require('uuid')

const fs = require('fs')

const _objects = {
  property: {
    active: false,
    address: {
      number: 0,
      street: '',
      postcode1: '',
      postcode2: ''
    },
    status: {
      type: '',
      status: 'For Sale',
      international: true,
    },
    descriptions: {
      shortdescription: '',
      description: '',
      location: '',
      additional: ''
    },
    details: {
      type: '',
      subtype: '',
      bedrooms: 0,
      bathrooms: 0,
      receptions: 0
    },
    features: [
      {garage: false},
      {offstreetparking: false},
    ],
    description: '',
    localinfo: '',
    amenities: '',
    highlights: [],
    price: {
      type: '',
      amount: 0,
      rentalfrequency: ''
    },
    lease: {
      freehold: false,
      freeholdshared: false,
      length: 0
    },
    runningcosts: {
      groundrent: {
        amount: 0,
        frequency: ''
      },
      servicecharge: {
        amount: 0,
        frequency: ''
      },
      counciltaxband: ''
    },
    images: [],
    floorplan: '',
    epc: '',
    links: {
      rightmove: ''
    }
  }
}

function _load(db, io) {
  console.log('_load')
  db.propertyCollection.find().toArray(function(err, res) {
    if (err) throw err
    console,log(res)
    var properties = []
    for (var i = 0; i < res.length; i++) {
      var property = res[i]
      delete property._id
      properties.push(property)
    }
    io.emit('updateProperties', {properties: properties})
  })
}

function _create(type, data) {
  const initial = JSON.parse(JSON.stringify(_objects[type]))
  initial.id = data.id ? data.id : uuidv4()
  const keys = Object.keys(data)
  for (let i = 0; i < keys.length; i++) {
    console.log(keys[i], data[keys[i]])
    initial[keys[i]] = data[keys[i]]
  }
  return initial
}

module.exports = {

  // Site

  getSite: function(db, io, debugOn) {
    db.siteCollection.findOne({}, function(err, res) {
      if (err) throw err
      if (!res) {
        const data = {
          buyingdescription: 'Buying description',
          rentingdescription: 'Renting description'
        }
        db.propertyCollection.insertOne(data, (err) => {
          io.emit('updateDescriptions', data)
        })
      } else {
        io.emit('updateDescriptions', {descriptions: res})
      }
    })
  },

  // Properties


  getProperties: function(db, io, debugOn) {
    _load(db, io)
  },

  updateLive: function(db, io, data, debugOn) {

    if (debugOn) { console.log('updateLive', data) }

    db.propertyCollection.updateOne({'id': data.id}, {$set: {live: data.live}}, function(err, res) {
      if (err) throw err
      _load(db, io)
    })
  },

  createProperty: function(db, io, data, debugOn) {

    if (debugOn) { console.log('createProperty', data) }

    const res = _create('property', data)
    db.propertyCollection.insertOne(res, (err) => {
      if (err) throw err
      _load(db, io)
    })
  },

  updateProperty: function(db, io, data, debugOn) {

    if (debugOn) { console.log('updateProperty', data) }

    db.propertyCollection.findOne({id: data.id}, function(err, res) {
      if (err) throw err
      if (res) {
        db.propertyCollection.updateOne({'_id': res._id}, {$set: data}, function(err, res) {
          if (err) throw err
          _load(db, io)
        })
      }
    })
  },

  deleteProperty: function(db, io, data, debugOn) {

    if (debugOn) { console.log('deleteProperty', data) }

    db.propertyCollection.deleteOne({id: data.id}, (err) => {
      if (err) throw err
      _load(db, io)
    })
  },

  uploadFile: function(db, io, data, debugOn) {

    if (debugOn) { console.log('uploadFile', data) }

    const file = __dirname + '/../assets/img/properties/' + data.type + 's/' + data.name
    fs.writeFile(file, data.content, err => {
      if (err) {
        console.error(err);
      } else {
        db.propertyCollection.findOne({id: data.id}, function(err, res) {
          if (err) throw err
          if (res) {
            const id = res._id
            delete res._id
            if (data.type == "image") {
              let images = []
              for (let i = 0; i < res.images.length; i++) {
                images.push(res.images[i])
              }
              images.push(data.name)
              res.images = images
            } else {
              res[data.type] = data.name
            }
            db.propertyCollection.updateOne({'_id': id}, {$set: res}, function(err, res) {
              if (err) throw err
              _load(db, io)
            })
          }
        })
      }
    })
  },

}
