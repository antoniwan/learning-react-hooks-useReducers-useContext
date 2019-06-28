import React, { useState, useReducer, createContext, useContext } from "react";
import uuid from "uuid/v4";
import filterReducer from "./reducers/filterReducer";
import todoReducer from "./reducers/todoReducer";

const TodoContext = createContext(null);
const FilterContext = createContext(null);

const initialTodos = [
  {
    id: uuid(),
    task: "Learn React",
    complete: true
  },
  {
    id: uuid(),
    task: "Learn Firebase",
    complete: true
  },
  {
    id: uuid(),
    task: "Learn GraphQL",
    complete: false
  },
  {
    id: uuid(),
    task: "Learn Apolo",
    complete: false
  }
];

const Filter = () => {
  const dispatch = useContext(FilterContext);
  const handleShowAll = () => {
    dispatch({ type: "SHOW_ALL" });
  };
  const handleShowComplete = () => {
    dispatch({ type: "SHOW_COMPLETE" });
  };
  const handleShowIncomplete = () => {
    dispatch({ type: "SHOW_INCOMPLETE" });
  };

  return (
    <div>
      <button type="button" onClick={handleShowAll}>
        Show All
      </button>
      <button type="button" onClick={handleShowComplete}>
        Show Complete
      </button>
      <button type="button" onClick={handleShowIncomplete}>
        Show Incomplete
      </button>
    </div>
  );
};

const TodoList = ({ todos }) => {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

const TodoItem = ({ todo }) => {
  const dispatch = useContext(TodoContext);
  const handleChange = () => {
    dispatch({
      type: todo.complete ? "UNDO_TODO" : "COMPLETE_TODO",
      id: todo.id
    });
  };

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleChange}
        />
        {todo.task}
      </label>
    </li>
  );
};

const AddTodo = () => {
  const dispatch = useContext(TodoContext);
  const [task, setTask] = useState("");

  const handleSubmit = event => {
    if (task) {
      dispatch({ type: "ADD_TODO", task: task, id: uuid() });
    }

    setTask("");
    event.preventDefault();
  };

  const handleChange = event => setTask(event.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={task} onChange={handleChange} />
      <button type="submit">Add Todo</button>
    </form>
  );
};

function App() {
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);
  const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");

  const filteredTodos = todos.filter(todo => {
    if (filter === "ALL") {
      return true;
    }

    if (filter === "COMPLETE" && todo.complete) {
      return true;
    }

    if (filter === "INCOMPLETE" && !todo.complete) {
      return true;
    }

    return false;
  });

  return (
    <TodoContext.Provider value={dispatchTodos}>
      <FilterContext.Provider value={dispatchFilter}>
        <Filter />
        <TodoList todos={filteredTodos} />
        <AddTodo />
      </FilterContext.Provider>
    </TodoContext.Provider>
  );
}

export default App;
