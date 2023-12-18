// file actions/todosActions.js
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  text,
});

export const updateTodo = (id, text) => ({
  type: 'UPDATE_TODO',
  id,
  text,
});

export const deleteTodo = (id) => ({
  type: 'DELETE_TODO',
  id,
});
