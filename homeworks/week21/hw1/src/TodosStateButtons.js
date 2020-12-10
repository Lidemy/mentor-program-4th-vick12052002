import styled from 'styled-components';
import React from 'react';

const TodosStateButtons = styled.div`
  display:flex;
  flex-direction:row;
  min-width:100%;
  border-bottom:2px solid ${props => props.theme.btn_color};

`;
const TodosStateButton = styled.button`
  background-color:${props => props.theme.background_color};
  height:40px;
  width:100%;
  border:none;
  cursor: pointer;
  font-size:1.5em;
  font-weight:bold;
  border:1px solid ${props => props.theme.btn_color};
  border-radius:5px;
`;


// eslint-disable-next-line react/prop-types
export default function StateButtons({ onClickFunction }) {
  return (
    <TodosStateButtons>
      <TodosStateButton onClick={() => { onClickFunction(null); }}> All </TodosStateButton>
      <TodosStateButton onClick={() => { onClickFunction('undone'); }}> In Progress </TodosStateButton>
      <TodosStateButton onClick={() => { onClickFunction('done'); }}> Done </TodosStateButton>
    </TodosStateButtons>
  );
}
