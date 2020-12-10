/* eslint-disable max-len */
function countTotal(newBoard, currentY, currentX, directionY, directionX) {
  let total = 0;
  const nowChess = newBoard[currentY][currentX].value;
  let tempX = currentX;
  let tempY = currentY;
  while (total < 5) {
    tempX += directionX;
    tempY += directionY;
    if (tempX < 0 || tempX > 18 || tempY < 0 || tempY > 18 || newBoard[tempY][tempX].value !== nowChess) break;
    total += 1;
  }
  return total;
}

const checkWinner = (newBoard, chessY, chessX) => {
  if (
    countTotal(newBoard, chessY, chessX, 1, 0) + countTotal(newBoard, chessY, chessX, -1, 0) >= 4
    || countTotal(newBoard, chessY, chessX, 0, 1) + countTotal(newBoard, chessY, chessX, 0, -1) >= 4
    || countTotal(newBoard, chessY, chessX, 1, 1) + countTotal(newBoard, chessY, chessX, -1, -1) >= 4
    || countTotal(newBoard, chessY, chessX, 1, -1) + countTotal(newBoard, chessY, chessX, -1, 1) >= 4
  ) {
    return true;
  }
  return false;
};

export default checkWinner;
