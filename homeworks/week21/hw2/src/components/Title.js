/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  position:relative;
  max-width:800px;
  margin:0 auto;
`;
const BoardTitle = styled.h1`
  padding-top:10px;
  margin:20px 0 10px 0;
`;
const ResetButton = styled.button`
  height:40px;
  border:none;
  cursor: pointer;
  font-size:1rem;
  border-radius:5px;
  position:absolute;
  top:50%;
  right:10px;
  transform:translateY(-50%);
`;

export default function Title({ player, resetFunction }) {
  return (
    <Header>
      <BoardTitle>
        Player is
        {player}
      </BoardTitle>
      <ResetButton onClick={resetFunction}>reset</ResetButton>
    </Header>
  );
}
