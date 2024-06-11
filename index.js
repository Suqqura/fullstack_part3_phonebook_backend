// puhelinluettelon backend 3.1 - 3.8* done

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

// middleware morgan 'tiny' + body(POST data), 3.7 & 3.8
morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})

morgan.format('tiny',':method :url :status :res[content-length] - :response-time ms :body')
app.use(morgan('tiny'))


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

// homepage just because why not
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
  const personsAmount = persons.length
  response.send(`
    <p>Phonebook has info for ${personsAmount} people </p>
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

// new person, 3.5
const generateId = () => {
  const randomId = Math.floor(Math.random() * 99999)
  console.log(randomId)

  return randomId
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) { 
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  nameExists = persons.find(person => person.name === body.name)
  if (nameExists) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(person)
})


// port
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
