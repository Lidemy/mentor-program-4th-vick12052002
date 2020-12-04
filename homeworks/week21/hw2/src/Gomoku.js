import React, { useState } from 'react';
import Title from './components/Title';
import Board from './components/Board';
import Winnerbox from './components/Winner';
import checkWinner from './checkWinner';

function initBoardArray() {
  const boardArray = [];
  let id = 1;
  for (let i = 0; i < 19; i += 1) {
    const boardArrayRow = [];
    for (let j = 0; j < 19; j += 1) {
      boardArrayRow.push({
        id,
        value: null,
      });
      id += 1;
    }
    boardArray.push(boardArrayRow);
  }
  return boardArray;
}
export default function Gomoku() {
  const initPlayer = 'black';
  const [board, setBoard] = useState(initBoardArray);
  const [player, setPlayer] = useState(initPlayer);
  const [winner, setWinner] = useState(null);
  const handleUpdateChess = (y, x, value) => {
    if (value || winner) return; // 檢查是否已有旗子、贏家，如果有則不能下棋
    const newBoard = board.map((row, currentY) => {
      if (currentY !== y) return row; // 找尋相同的row，不是則直接返回

      return row.map((col, currentX) => {
        if (currentX !== x) return col;
        return {
          ...col,
          value: player,
        };
      });
    });

    setBoard(newBoard);
    // eslint-disable-next-line no-unused-expressions
    checkWinner(newBoard, y, x) ? setWinner(player)
      : setPlayer(player === 'black' ? 'white' : 'black');
  };
  const handleResetBoard = () => {
    setBoard(initBoardArray);
    setPlayer(initPlayer);
    setWinner(null);
  };
  return (
    <div className="app">
      <Title player={player} resetFunction={handleResetBoard} />
      <Board boardInfo={board} onClick={handleUpdateChess} player={player} />
      <Winnerbox winner={winner} />
    </div>
  );
}
