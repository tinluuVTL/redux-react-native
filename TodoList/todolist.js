// file TodoList.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, updateTodo, deleteTodo } from './actions';
import { FontAwesome } from 'react-native-vector-icons';

const TodoList = () => {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  const handleAddTodo = () => {
    if (newTodo) {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  const handleEditTodo = (id) => {
    const editedTodo = todos.find((todo) => todo.id === id);
    if (editedTodo) {
      setEditingTodo(editedTodo);
      setNewTodo(editedTodo.text);
    }
  };

  const handleUpdateTodo = () => {
    if (editingTodo) {
      dispatch(updateTodo(editingTodo.id, newTodo));
      setEditingTodo(null);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

   return (
   <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new todo"
          value={newTodo}
          onChangeText={(text) => setNewTodo(text)}
        />
        <View style={styles.buttonContainer}>
          <FontAwesome
            name="plus-circle" 
            size={30}
            color="blue" 
            onPress={handleAddTodo}
              style={styles.icon}
          />
          {editingTodo && (
            <FontAwesome
           
             name="save"
              size={30}
              color="green"
              onPress={handleUpdateTodo} 
                style={styles.icon}
            />
          )}
        </View>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.text}</Text>
            <FontAwesome
              name="edit" 
              size={20} 
              color="green" 
              onPress={() => handleEditTodo(item.id)}
            />
            <FontAwesome
              name="trash" 
              size={20} 
              color="red" 
              onPress={() => handleDeleteTodo(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
 
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  todoText: {
    flex: 1,
  },
   buttonContainer: {
    flexDirection: 'row', // Hiển thị cùng một hàng
    alignItems: 'center',
  },
  // Kiểu cho biểu tượng
  icon: {
    marginRight: 10, // Khoảng cách giữa biểu tượng và các thành phần khác
  },
});
export default TodoList;
