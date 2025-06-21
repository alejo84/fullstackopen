import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons' 
import ErrorMessage from './components/ErrorMessage'
import { useState, useEffect } from 'react'
import myData from './services/communications'

const App = () => {

  const [persons, setPersons] = useState([])
  const [personsToShow,setPersonsToShow]=useState(persons)  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage,setErrorMessage]= useState(null)
  
  useEffect(()=>{
    myData
      .getAllPeople()
      .then(initialData=>{
        setPersons(initialData)
        setPersonsToShow(initialData)})    
  }, [])
  
  const handleOnChangeName=(event)=>setNewName(event.target.value)

  const handleOnChangeNumber=(event)=>setNewNumber(event.target.value)

  const handleOnChangeFilter=(event)=>{
    const currentFilter=event.target.value    
    const filteredPersons=persons.filter((x)=>x.name.toLowerCase().includes(currentFilter.toLowerCase()))
    setPersonsToShow(filteredPersons)   
    setNewFilter(event.target.value)
  }

  const setValues=(myPersons)=>{
    setNewFilter('')
    setPersonsToShow(myPersons)
    setNewName('')
    setNewNumber('')
    setPersons(myPersons)   
  }

  const handleOnClick=(event)=>{
    event.preventDefault()  
    if(persons.some((x)=>x.name.toLowerCase()==newName.toLowerCase())){
      if(window.confirm(`${newName} is already added to phonebook. Replace the old number for a new one?`)){
        const oldPerson=persons.find((x)=>x.name.toLowerCase()===newName.toLowerCase())
        const newPerson={...oldPerson, number: newNumber}
        myData.updatePerson(oldPerson.id,newPerson)
        .then(()=>{
          myData.getAllPeople()
            .then(response=>{
              const myPersons=response
              setValues(myPersons)  
            })              
        }) 
      }          
    }else{      
      const newPerson={name: newName, number: newNumber}
      myData.createPerson(newPerson)
        .then(createdPerson=>{
          const myPersons=persons.concat(createdPerson)
          setValues(myPersons)
        })      
    }    
  }

  const handleDeleteClick=(id)=>{
    const Person=persons.find(x=>x.id===id)    
    if (window.confirm(`Delete ${Person.name}?`)){
      myData.deletePerson(id)
      .then(()=>{
        myData.getAllPeople()
          .then(response=>{
            const myPersons=response
            setValues(myPersons)  
          })              
      }) 
      .catch(error=>{
        setErrorMessage(`Information of ${Person.name} has already been removed from server`)
        setTimeout(()=>{
          setErrorMessage(null)},
          5000)
          myData.getAllPeople()
          .then(response=>{
            const myPersons=response
            setValues(myPersons)  
          })        
      })
    }      
  } 

  return (    
    <div>      
      <h2>Phonebook</h2>
        <ErrorMessage message={errorMessage}></ErrorMessage>
        <Filter value={newFilter} handler={handleOnChangeFilter}></Filter>
      <h2>Add a new</h2>        
        <Form 
          newName={newName} 
          handlerNewName={handleOnChangeName} 
          newNumber={newNumber} 
          handlerNewNumber={handleOnChangeNumber}
          handlerButton={handleOnClick}>
          </Form>
      <h2>Numbers</h2>
        <Persons persons={personsToShow} onDelete={handleDeleteClick}></Persons>
    </div>
  )
}

export default App