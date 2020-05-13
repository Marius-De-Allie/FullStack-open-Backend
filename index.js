require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

// morgan token.
morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
  );


// let persons = [
//     { 
//       "name": "Arto Hellas", 
//       "number": "040-123456",
//       "id": 1
//     },
//     { 
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523",
//       "id": 2
//     },
//     { 
//       "name": "Dan Abramov", 
//       "number": "12-43-234345",
//       "id": 3
//     },
//     { 
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122",
//       "id": 4
//     }
//   ];

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
      res.json(persons.map(person => person.toJSON()))
    })
});

app.get('/info', (req, res) => {
    const date = new Date();
    const numOfPersons = persons.length;
    res.send(`<p>Phonebook has info for ${numOfPersons} people.</p><p>${date}</p>`)
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if(person) {
        res.json(person);
    } else {
        res.status(404).end()
    }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const id = Math.floor(Math.random() * 10000);
  const body = req.body;
  const namesArray = persons.map(person => person.name.toLowerCase());

  if(!body.name) {
    return res.status(400).json({ 
      error: 'name missing' 
    })
  } else if(!body.number) {
    return res.status(400).json({ 
      error: 'number missing' 
    })

  } else if(namesArray.includes(body.name.toLowerCase())) {
    return res.status(400).json({ 
      error: 'name must be unique' 
    })
  } else {
    const person = {
      name: body.name,
      number: body.number,
      id
    }
    persons = persons.concat(person);
 
    res.json(person)
  }
});

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});