const todoReducer = (state, action) => {
  switch (action.type) {
    case "COMPLETE_TODO":
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });
    case "UNDO_TODO":
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });
    case "ADD_TODO":
      return state.concat({
        task: action.task,
        id: action.id,
        complete: false
      });
    default:
      throw new Error();
  }
};

export default todoReducer;
