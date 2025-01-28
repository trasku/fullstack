import { useState } from 'react'

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

const Persons = ({ personsToShow }) => {
  return (
    <div>
    {personsToShow.map((person) => (<DisplayNames person={person} key={person.name} />))}
    </div>
  )
  }

const DisplayNames = ({ person }) => {
  return (
    <div>
      <p>{person.name} {person.number}</p>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addInfo = (event) => {
    event.preventDefault()
    event.preventDefault();
    if (!newName || !newNumber) {
      alert('Please provide both name and number')
      return
    }
    const infoObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === infoObject.name)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(infoObject))
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
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App