import React from 'react';

const AddPerson = (props) => {
    return(
        <form onSubmit={props.addPerson}>
        <div>
          name: <input onChange={props.addPersonChange} value={props.newName}/>
          number: <input onChange={props.addNumberChange} value={props.newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default AddPerson;