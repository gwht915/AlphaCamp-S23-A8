const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error(mongoose.js)!')
})

db.once('open', () => {
  console.log('mongodb connected(mongoose.js)!')
})

module.exports = db