import React from 'react';

const Filter = ({ searchChange }) => {
    return(
        <div>
            Serach: <input onChange={searchChange}  />
        </div>
    )
};

export default Filter;