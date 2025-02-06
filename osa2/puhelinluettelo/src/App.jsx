import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
    marginBottom: 10
  }

  const addingStyle = {
    color: 'green',
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }
    return (
    <div style={addingStyle}>
      {message}
    </div>
    )
}

const ErrorMessage = ({ errorMessage }) => {
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
    marginBottom: 10
  }

  if (errorMessage === null) {
    return null
  }
    return (
    <div style={errorStyle}>
      {errorMessage}
    </div>
    )
}

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

const Persons = ({ personsToShow, setPersons, persons, setMessage, setErrorMessage }) => {
  return (
    <div>
    {personsToShow.map((person) => (<DisplayNames person={person} setPersons={setPersons} persons={persons} setMessage={setMessage} setErrorMessage={setErrorMessage} key={person.name} />))}
    </div>
  )
  }

  const DisplayNames = ({ person, setPersons, persons, setMessage, setErrorMessage }) => {
    const handleDelete = () => {
      if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
        personService.deletePerson(person.id)
          .then(() => {
            setPersons(persons.filter(person1 => person1.id !== person.id))
            setMessage(`Deleted ${person.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch((error) => {
            setErrorMessage(`Information of ${person.name} has already been removed from server`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 3000)
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
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
              setMessage(`Replaced the old number of ${updatedPerson.data.name} with ${updatedPerson.data.number}`)
              setTimeout(() => {
                setMessage(null)
              }, 3000)
            })
            .catch((error) => {
              setErrorMessage(`Information of ${updatedPerson.data.name} has already been removed from server}`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 3000)
            })
        }
    }
    else {
      personService
        .create(infoObject)
        .then((response) => {
          setPersons(persons.concat(response.data))
          setMessage(`Added ${infoObject.name}`)
          setTimeout(() => {setMessage(null)
        }, 3000)
      })
        .catch((error) => {
          setMessage(`Error adding a person: ${error}`)
          setTimeout(() => {setMessage(null)
          }, 3000)
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
      <Notification message={message} />
      <ErrorMessage errorMessage={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm 
      addInfo={addInfo} newName={newName} 
      newNumber={newNumber} handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} setPersons={setPersons} persons={persons} setMessage={setMessage} setErrorMessage={setErrorMessage} />
    </div>
  )
}

export default App