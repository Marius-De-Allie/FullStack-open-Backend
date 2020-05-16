/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// if(process.argv.length<3) {
//     console.log('give password as argument')
//     process.exit(1)
// }

mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

// const password = process.argv[2];


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  // eslint-disable-next-line no-unused-vars
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((e) => {
    console.log('error connecting to MongoDB:', e.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  number: {
    type: String,
    minlength: 8,
    required: false,
  },
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle
    // eslint-disable-next-line no-param-reassign
    returnedObject.id = returnedObject._id.toString()
    // eslint-disable-next-line no-underscore-dangle
    delete returnedObject._id
    // eslint-disable-next-line no-underscore-dangle
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
