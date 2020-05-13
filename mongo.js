const mongoose = require('mongoose');

if(process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0-ml26d.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number
});

const Person = mongoose.model('Person', personSchema);

if(process.argv.length > 3) {
    // create and add new person document to mongoDB collection.
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
        id: Math.floor(Math.random() * 10000)
    });
    
    person.save().then(response => {
        console.log(`added ${response.name} number ${response.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        console.log('phonebook:');
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}




