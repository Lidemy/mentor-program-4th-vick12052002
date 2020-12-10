/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const WinnerBoxWrapper = styled.div`
  position: absolute;
  display:${props => (props.winner ? 'block' : 'none')};
  max-width:800px;
  margin:0 auto;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  background-color:#ccc;
  padding:2rem;
  box-shadow:3px 4px 4px #999;
`;
const Title = styled.h1`
  padding-top:10px;
  margin:20px 0 10px 0;
`;
const Button = styled.button`
  height:40px;
  border:none;
  cursor: pointer;
  font-size:1rem;
  border-radius:5px;
`;

export default function Winnerbox({ winner }) {
  return (
    <WinnerBoxWrapper winner={winner}>
      <Title>
        Winner is
        {winner === 'black' ? '黑棋' : '白旗'}
      </Title>
      <Button onClick={() => { window.location.reload(); }}>再玩一次</Button>
    </WinnerBoxWrapper>
  );
}
