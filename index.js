// puhelinluettelon backend 3.1 - 3.18* done

require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')

const Person = require('./models/person')

app.use(express.static('dist'))


// middleware morgan 'tiny' + body(POST data), 3.7 & 3.8
morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})

morgan.format('tiny',':method :url :status :res[content-length] - :response-time ms :body')
app.use(morgan('tiny'))


// error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

const cors = require('cors')

app.use(cors())
app.use(express.json())

// unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


// homepage just because why not
app.get('/', (request, response) => {
  response.send('<h1>Hello World! persons?</h1>')
})


// get all
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  .catch(error => next(error))
})


// get 1 person, 3.3
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


// delete person, 3.4
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})


// new person, 3.5
app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})


// update person
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


// info, 3.2
app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
    `)
  })
  .catch(error => next(error))
})


app.use(unknownEndpoint)
app.use(errorHandler)


// port
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
