import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ( {newFilter, handleFilterChange }) => {
  return(
    <div>
      filter shown with <input
      value={newFilter}
      onChange={handleFilterChange}
      />
    </div>
  )
}

const PersonForm = ({addInfo, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={addInfo}>
      <div>
        name: <input 
        value={newName}
        onChange={handleNameChange} 
        />
      </div>
      <div>
        number: <input 
        value={newNumber}
        onChange={handleNumberChange} 
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ personsToShow, setPersons, persons }) => {
  return (
    <div>
    {personsToShow.map((person) => (<DisplayNames person={person} setPersons={setPersons} persons={persons} key={person.name} />))}
    </div>
  )
  }

  const DisplayNames = ({ person, setPersons, persons }) => {
    const handleDelete = () => {
      if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
        personService.deletePerson(person.id)
          .then(() => {
            setPersons(persons.filter(person1 => person1.id !== person.id))
          })
          .catch((error) => {
            console.error('Error deleting the person:', error)
          })
      }
    }
  
    return (
      <div>
        <p>{person.name} {person.number}
          <button onClick={handleDelete}>delete</button>
        </p>
      </div>
    )
  }

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        console.log('promise fullfilled')
        setPersons(response.data)
      })
  }, [])
  
  const addInfo = (event) => {
    event.preventDefault()
    if (!newName || !newNumber) {
      alert('Please provide both name and number')
      return
    }
    const infoObject = {
      name: newName,
      number: newNumber
    }
    const existingPerson = persons.find(person => person.name === infoObject.name)
    if (existingPerson) {
      if (window.confirm(`${infoObject.name} is already added to phonebook, replace the old number with a new one?`)) {
          personService.updatePerson(existingPerson.id, infoObject)
            .then(updatedPerson => {
              setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson.data))
            })
        }
    }
    else {
      personService
        .create(infoObject)
        .then((response) => {
          setPersons(persons.concat(response.data))
        })
        .catch((error) => {
          console.error('Error adding a person:', error)
        })
    }
    setNewName('')
    setNewNumber('')
  }
  
  const personsToShow = newFilter
    ? persons.filter(person => 
      person.name.toLowerCase().includes(newFilter.toLowerCase()))
    : persons
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm 
      addInfo={addInfo} newName={newName} 
      newNumber={newNumber} handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} setPersons={setPersons} persons={persons} />
    </div>
  )
}

export default App