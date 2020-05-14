const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// if(process.argv.length<3) {
//     console.log('give password as argument')
//     process.exit(1)
// }

mongoose.set('useFindAndModify', false);

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

// const password = process.argv[2];


mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch(e => {
        console.log('error connecting to MongoDB:', e.message);
    })

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    number: String
});

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)