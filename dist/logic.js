const checkEquality = (board, marker) => {
    return board[0] === marker && board[1] === marker && board[2] === marker;
};
export const evaluator = (board, marker) => {
    console.log(board);
    marker = marker.toLowerCase();
    let winner = false;
    let columns = [];
    for (let row = 0; row < board.length && !winner; row++) {
        let target = board[row];
        //check the complete row
        winner = checkEquality(target, marker);
        for (let col = 0; col < target.length && !winner; col++) {
            if (!columns[col]) {
                columns[col] = ["", "", ""];
            }
            columns[col][row] = target[col];
        }
    }
    //check the columns
    if (!winner) {
        for (let row = 0; row < columns.length && !winner; row++) {
            winner = checkEquality(columns[row], marker);
        }
    }
    //check the diagonals
    if (!winner) {
        winner =
            checkEquality([board[0][0], board[1][1], board[2][2]], marker) ||
                checkEquality([board[0][2], board[1][1], board[2][0]], marker);
    }
    return winner;
};
