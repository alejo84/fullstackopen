const morgan=require('morgan')
const express=require('express')
const app=express()
const cors=require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))
morgan.token('type', function (req, res) { return JSON.stringify(req.body) })

let persons=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request,response)=>{
    response.json(persons)
})

app.get('/api/persons/:id', (request,response)=>{
    const id=Number(request.params.id)
    const person=persons.find(x=>x.id===id)    
    if (person){
      response.json(person)
    }else{
      response.status(400).end()
    }    
})

app.get('/api/info', (request,response)=>{
    const now=Date(Date.now()).toString()        
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${now}</p>`)
})

app.delete('/api/persons/:id', (request,response)=>{
  const id=Number(request.params.id)
  persons=persons.filter(x=>x.id!==id) 
  response.status(204).end()
})

app.post('/api/persons',(request,response)=>{    
  const body=request.body  
  if (!body){
    return response.status(400).json({
      "error": "Empty request"
    })}
  if(!body.number){
      return response.status(400).json({
        "error": "Number missing"
      })
    }else if(!body.name){
      return response.status(400).json({
        "error": "Name missing"
      })
    }else{      
      const result = persons.find(x=> x.name.toLowerCase() === body.name.toLowerCase())    
      if (result){
        return response.status(400).json({
          "error": "Name must be unique"
        })
      } else{
        const id=Math.floor(Math.random()*10000)
        const newPerson={
          "id":id,
          "name":body.name,
          "number":body.number
        }
        persons=persons.concat(newPerson)
        response.status(200).end() 
      }  
    }   
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
