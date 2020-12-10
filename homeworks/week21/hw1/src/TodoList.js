import styled from 'styled-components';
import React from 'react';

const TodoItemWrapper = styled.div`
  display:flex;
  text-align:center;
  justify-content:space-between;
  background-color:${props => props.theme.background_color};
  color:${props => props.theme.color};
  min-width:90%;
  margin:0 auto;
  margin-top:10px;
  padding:5px;
  border-bottom:2px solid ${props => props.theme.btn_color};
  box-sizing: border-box;
`;
const TodoContent = styled.h1`
  margin:5px;
  color:${props => props.theme.color};
  ${props => props.isDone && `
    text-decoration:line-through;
    filter:darkness(80%);
    color:gray;
  `}
`;
const Buttons = styled.div`
  display:flex;
  justify-content:space-between;
`;
const ButtonDone = styled.button`
  color:white;
  background-color:#48C886;
  border:none;
  border-radius:5px;
  padding:0.5em;
  &:hover{
    color:black;
    filter:brightness(1.2);}
  ${props => props.isDone && `
    text-decoration:line-through;
    filter:darkness(80%);
    color:gray;
  `}
  `;
const ButtonDelete = styled.button`
  color:red;
  background-color:${props => props.theme.btn_color};
  border:none;
  border-radius:5px;
  padding:0.5em;
  &:hover{
    color:white;
    filter:brightness(1.2);
  }
`;
export default function TodoList({ todos, handleIsDoneTodo, handleDeleteTodo }) {
  return (
    todos.map(todo => (
      <TodoItemWrapper data-todo-id={todo.id} key={todo.id}>
        <TodoContent isDone={todo.isDone}>{todo.content}</TodoContent>
        <Buttons>
          <ButtonDone
            isDone={todo.isDone}
            onClick={() => { handleIsDoneTodo(todo.id); }}
          >
            {todo.isDone ? '已完成' : '未完成'}
          </ButtonDone>
          <ButtonDelete onClick={() => {
            handleDeleteTodo(todo.id);
          }}
          >
            刪除
          </ButtonDelete>
        </Buttons>
      </TodoItemWrapper>
    ))
  );
}
