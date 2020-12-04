/* eslint-disable consistent-return */

import 'normalize.css';
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import TodosStateButtons from './TodosStateButtons';

const TodosContainer = styled.div`
  display:flex;
  max-width:520px;
  margin:20px auto;
  text-align:center;
  flex-direction:column;
  background-color:${props => props.theme.background_color};
  border-radius:5px;
  box-sizing:border-box;
  padding-bottom:8px;
`;

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, content: 'aaa', isDone: false },
  ]);
  const [status, setStatus] = useState(null);
  const [value, setValue] = useState('');
  const id = useRef(2);
  const handleInputButtonClick = (e) => {
    e.preventDefault();
    if (value.length === 0) return;
    setTodos([{
      id: id.current,
      content: value,
      isDone: false,
    }, ...todos]);

    id.current += 1;
    setValue('');
  };
  const handleInputValue = (e) => {
    setValue(e.target.value);
  };
  const handleDeleteTodo = (target) => {
    setTodos(todos.filter(todo => todo.id !== target));
  };
  const handleIsDoneTodo = (target) => {
    setTodos(todos.map((todo) => {
      if (todo.id !== target) return todo;
      return {
        ...todo,
        isDone: !todo.isDone,
      };
    }));
  };
  // eslint-disable-next-line array-callback-return
  const handleTodosModel = todos.filter((todo) => {
    if (!status) return true;
    if (status === 'done') return todo.isDone === true;
    if (status === 'undone') return todo.isDone === false;
  });
  const setTodoStatus = (model) => {
    setStatus(model);
  };
  const handelResetTodos = (e) => {
    e.preventDefault();
    setTodos([]);
  };
  return (
    <div className="App">
      <TodoInput
        resetClick={handelResetTodos}
        onChangeFunction={handleInputValue}
        onClick={handleInputButtonClick}
        inputValue={value}
      />
      <TodosContainer>
        <TodosStateButtons onClickFunction={setTodoStatus} />
        <TodoList
          todos={handleTodosModel}
          handleDeleteTodo={handleDeleteTodo}
          handleIsDoneTodo={handleIsDoneTodo}
        />
      </TodosContainer>
    </div>
  );
}
