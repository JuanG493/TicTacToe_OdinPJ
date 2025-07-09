import { evaluator } from "./evaluation.js";
export class Move {
    constructor() {
        this.col = 0;
        this.row = 0;
    }
}
function isMovesLeft(board) {
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (board[i][j] == '_')
                return true;
    return false;
}
function evaluate(board, player, opponent) {
    if (evaluator(board, player))
        return 10;
    if (evaluator(board, opponent))
        return -10;
    return 0;
}
function minimax(board, depth, isMax, player, opponent) {
    let score = evaluate(board, player, opponent);
    // If Maximizer has won the game
    // return his/her evaluated score
    if (score == 10)
        return score;
    // If Minimizer has won the game
    // return his/her evaluated score
    if (score == -10)
        return score;
    // If there are no more moves and
    // no winner then it is a tie
    if (isMovesLeft(board) == false)
        return 0;
    // If this maximizer's move
    if (isMax) {
        let best = -1000;
        // Traverse all cells
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Check if cell is empty
                if (board[i][j] == '_') {
                    // Make the move
                    board[i][j] = player;
                    // Call minimax recursively
                    // and choose the maximum value
                    best = Math.max(best, minimax(board, depth + 1, !isMax, player, opponent));
                    // Undo the move
                    board[i][j] = '_';
                }
            }
        }
        return best;
    }
    // If this minimizer's move
    else {
        let best = 1000;
        // Traverse all cells
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Check if cell is empty
                if (board[i][j] == '_') {
                    // Make the move
                    board[i][j] = opponent;
                    // Call minimax recursively and
                    // choose the minimum value
                    best = Math.min(best, minimax(board, depth + 1, !isMax, player, opponent));
                    // Undo the move
                    board[i][j] = '_';
                }
            }
        }
        return best;
    }
}
// This will return the best possible
// move for the player
function findBestMove(board, player, opponent) {
    let bestVal = -1000;
    let bestMove = new Move();
    bestMove.row = -1;
    bestMove.col = -1;
    // Traverse all cells, evaluate
    // minimax function for all empty
    // cells. And return the cell
    // with optimal value.
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // Check if cell is empty
            if (board[i][j] == '_') {
                // Make the move
                board[i][j] = player;
                // compute evaluation function
                // for this move.
                let moveVal = minimax(board, 0, false, player, opponent);
                // Undo the move
                board[i][j] = '_';
                // If the value of the current move
                // is more than the best value, then
                // update best
                if (moveVal > bestVal) {
                    bestMove.row = i;
                    bestMove.col = j;
                    bestVal = moveVal;
                }
            }
        }
    }
    return bestMove;
}
export const machineBestMove = (markPC, markOpponent, board) => {
    return findBestMove(board, markPC, markOpponent);
};
