import React, { useState, useEffect } from 'react'
import Filter from './Components/Filter';
import AddPerson from './Components/AddPerson';
import Persons from './Components/Persons';
import personsServices from './services/personsService';


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ search, setSearch ] = useState('');

  useEffect(() => {
    personsServices.getAll()
    .then(initialPersons => 
      setPersons(initialPersons))
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log(personObject);
    if (persons.some((person) => person.name.includes(newName)) === false) {
      personsServices.create(personObject)
      .then(newPersons => {
        setPersons(persons.concat(newPersons))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log(error.response.data.error)
      })
    }  else if (persons.some((person) => person.name.includes(newName)) === true) {
      if (window.confirm(`Update ${newName}'s number to ${newNumber}?`)) {
        const person = persons.find(person => person.name.includes(newName));
        const changedPerson = {...person, number: newNumber}

        console.log(personsServices.update(person.id, changedPerson))

        personsServices
      .update(changedPerson.id, changedPerson)
      .then(response =>
        setPersons(persons.map(pers => pers.id !== person.id ? pers : changedPerson)));
      };
    };
    
  };

  const deletePerson = (personID) => {
    const personToRemove = persons.find(person => person.id === personID);

    if (window.confirm(`Delete ${personToRemove.name}`)) {
      personsServices.remove(personID);
    };
    
  };

  const addPersonChange = (event) => {
    setNewName(event.target.value);
  }

  const addNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const searchChange = (event) => {
    setSearch(event.target.value);
    console.log("Search: ", search);
  }

//  persons.filter(persons.some((person) => person.name.includes(search)) === true);
  const personsToShow = search !== null
    ? persons.filter((person) => person.name.includes(search))
    : persons;

  return ( 
    <div>
      <h2>Phonebook</h2>
        <Filter searchChange={searchChange} />
        <AddPerson addPerson={addPerson} addPersonChange={addPersonChange} addNumberChange={addNumberChange} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <ul>
        <Persons persons={personsToShow} handleClick={deletePerson} />
      </ul>
    </div>
  )
}

export default App