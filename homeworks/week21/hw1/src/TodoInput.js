/* eslint-disable react/prop-types */
import styled from 'styled-components';
import React from 'react';

const ResetButton = styled.button`
  max-width:100px;
  height:40px;
  background-color:${props => props.theme.btn_color};
  border-radius:5px;
  position:absolute;
  right:20px;
  top:10px;
`;
const TodoForm = styled.form`
  margin:0 auto;
  text-align:center;
  background-color:${props => props.theme.background_color};
  max-width:500px;  
  margin-bottom:20px;
  border-radius:5px;
  position:relative;
`;
const FormTitle = styled.h1`
  padding-top:10px;
  margin:20px 0 10px 0;
`;
const FormInput = styled.input`
  box-sizing:border-box;
  padding: 0.5em;
  margin: 0.5em;
  border-radius:5px;
  border:none;
  &:hover{
    border:1px solid #777;
  }
`;

export default function TodoInput({
  resetClick, onChangeTodoInput, onClick, inputValue,
}) {
  return (
    <TodoForm>
      <FormTitle>ToDoList </FormTitle>
      <ResetButton onClick={resetClick}> 清空 </ResetButton>
      <FormInput type="text" onChange={onChangeTodoInput} value={inputValue} />
      <FormInput onClick={onClick} type="submit" />
    </TodoForm>
  );
}
