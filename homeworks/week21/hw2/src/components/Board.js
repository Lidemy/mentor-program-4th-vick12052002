/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import boardImg from '../img/Blank_Go_board.svg';

const Square = styled.button`
  color:black;
  border:none;
  border-radius:50%;
  box-sizing:border-box;
  background-color:rgba(0,0,0,0);
  width:20px;
  height:20px;
  margin:8px 10px;
  &:hover{
    background-color: ${props => (props.color ? props.color : props.player)};
    box-shadow: 2px 2px 5px;
  }
  ${props => props.color && `
    background-color:${props.color};
    box-shadow: 2px 2px 5px;
    `}
  `;

const BoardWrapper = styled.div`
  background-image: url(${boardImg});
  background-repeat:no-repeat;
  background-size: contain;
  width: 760px;
  height:760px;
  margin: 0 auto;
  display:flex;
  flex-wrap:wrap;
  padding:5px;
  `;

export default function Board({ boardInfo, onClick, player }) {
  return (
    <BoardWrapper>
      {boardInfo.map((row, rowIndex) => row.map(
        (col, colIndex) => (
          <Square
            key={col.id}
            onClick={() => { onClick(rowIndex, colIndex, col.value); }}
            color={col.value}
            player={player}
          />
        ),
      ))
      }
    </BoardWrapper>
  );
}
