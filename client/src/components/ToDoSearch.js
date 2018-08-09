import React from 'react';

const ToDoSearch = ({}) => {
  return (
    <div className="toDoSearch">
      <div className="searchContainer">
        <i className="fas fa-search" />
        <input type="search" name="searchToDo" />
      </div>
    </div>
  );
};

export default ToDoSearch;
