// file reducers/todosReducer.js
const initialState = {
  todos: [],
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.todos.length + 1,
            text: action.text,
          },
        ],
      };

    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, text: action.text } : todo
        ),
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };

    default:
      return state;
  }
};

export default todosReducer;
