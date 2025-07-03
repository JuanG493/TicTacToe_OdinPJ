import { evaluator } from "./evaluation.js";
import { board } from "./index.js";

let player = 'x', opponent = 'o';
export class Move {
    row: number
    col: number
    constructor() {
        this.col = 0;
        this.row = 0
    }
}

// This function returns true if there are moves
// remaining on the board. It returns false if
// there are no moves left to play.
function isMovesLeft(board: board[]) {
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (board[i][j] == '_')
                return true;

    return false;
}

function evaluate(board: board[]): number {
    let result = evaluator(board, player)
    return result ? 1 : 0;
}

function minimax(board: board[], depth: number, isMax: boolean) {
    let score = evaluate(board);

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
                    best = Math.max(best, minimax(board, depth + 1, !isMax));

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
                    best = Math.min(best, minimax(board,
                        depth + 1, !isMax));

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
function findBestMove(board: board[]): Move {
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
                let moveVal = minimax(board, 0, false);

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

export const machineBestMove = (markPC: string, markOpponent: string, board: board[]): Move => {
    player = markPC
    opponent = markOpponent
    return findBestMove(board);
}
