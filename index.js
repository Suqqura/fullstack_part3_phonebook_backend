// puhelinluettelon backend 3.1 - 3.4 done

const express = require('express')
const app = express()

// data 3.1
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-34-234345"
  },
  {
    id: 4,
    name: "Mary Poppendic",
    number: "39-23-6423122"
  },
]

// homepage
app.get('/', (request, response) => {
  response.send('<h1>Hello World! persons?</h1>')
})

// get all
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// info, 3.2
app.get('/info', (request, response) => {
  const now = new Date()
  const formattedNow = now.toString()
  response.send(`
    <p>Phonebook has info for ${persons.length} people </p>
    <p>${formattedNow}</p>
    `)
  console.log('Today is: ', formattedNow)

})

// get 1 person, 3.3
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(204).end()
  }
})

// delete person, 3.4
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  
  response.status(204).end()
})


// port
const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})