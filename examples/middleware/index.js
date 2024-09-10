const express = require('express')
const app = express();
app.use(express.json());

var currentDate = new Date(); 
var currentDateString = currentDate.toString();


let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: "1",
  },
  { 
      name: "Ada Lovelace", 
      number: "39-44-5323523",
      id: "2"
  },
  { 
      name: "Dan Abramov", 
      number: "12-43-234345",
      id: "3"
  },
  { 
      name: "Mary Poppendieck", 
      number: "39-23-6423122",
      id: "4"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} persons </br> ${currentDateString}`); 
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  id = request.params.id
  const person = persons.find(person =>person.id ==id)
  if (person) {
    response.json(person)
  } else{
        response.status(404).end()
  }

})

app.delete('/api/persons/:id', (request, response) => {

    id = request.params.id
    persons = persons.filter(person=>person.id != id)
    response.status(204).end()

})

const generateID = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => Number(n.id))) 
        : 0
    return String(maxId + 1)
}


app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body) {
        return response.status(400).json({ 
            error: 'The name or number are missing' 
        })
    }


    const person = {
        name: body.name,
        number:body.number,
        id: generateID(),
    }

    const duplicate = persons.find(personcheck =>personcheck.name == person.name)
    if (duplicate) {
        return response.status(400).json({ 
            error: `The name ${person.name} already exists` 
        })
    }

    persons = persons.concat(person)
    response.json(person)

})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
