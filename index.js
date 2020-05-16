if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config()
}
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
// app.use(logger)

// morgan token.
morgan.token('body', (req) => JSON.stringify(req.body))

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
)


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
  Person.find({}).then((persons) => {
    res.json(persons.map((person) => person.toJSON()))
  })
    .catch((e) => {
      console.log('Unable to retrieve persons', e)
    })
})

app.get('/info', (req, res) => {
  const date = new Date()
  Person.find({})
    .then((persons) => {
      res.send(`<p>Phonebook has info for ${persons.length} people.</p><p>${date}</p>`)
    })
    .catch((e) => {
      console.log('unable to retrive info', e)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch((e) => next(e))
})

app.delete('/api/persons/:id', (req, res) => {
  const { id } = req.params
  Person.findByIdAndRemove(id)
    // eslint-disable-next-line no-unused-vars
    .then((result) => {
      res.status(204).end()
    })
    .catch((e) => {
      console.log(e)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  // const body = req.body;

  const person = {
    ...req.body,
    number: req.body.number,
  }
  // const person = {
  //   name: body.name,
  //   number: body.number
  // }

  Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then((updatedPerson) => updatedPerson.toJSON())
    .then((formamttedUpdatedPerson) => {
      res.json(formamttedUpdatedPerson)
    })
    .catch((e) => next(e))
})

app.post('/api/persons', (req, res, next) => {
  // const id = Math.floor(Math.random() * 10000);
  const { body } = req
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedAndFormattedPerson) => {
      res.json(savedAndFormattedPerson)
    })
    .catch((error) => next(error))
})

// eslint-disable-next-line consistent-return
const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
