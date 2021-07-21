import React from 'react';

const Persons = ({ persons, handleClick }) => persons.map((person) => <li key={person.id}>{person.name} - {person.number} <button onClick={() => handleClick(person.id)}>Delete</button></li>);

export default Persons;