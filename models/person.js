const mongoose = require('mongoose');

// if(process.argv.length<3) {
//     console.log('give password as argument')
//     process.exit(1)
// }

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

// const password = process.argv[2];


mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch(e => {
        console.log('error connecting to MongoDB:', e.message);
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject._id.toString()
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)