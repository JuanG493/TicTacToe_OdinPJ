import { evaluator } from "./evaluation.js";
import { board } from "./index.js";

export class Move {
    row: number
    col: number
    constructor() {
        this.col = 0;
        this.row = 0
    }
}

function isMovesLeft(board: board[]) {
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (board[i][j] == '_')
                return true;

    return false;
}

function evaluate(board: board[], player: string, opponent: string): number {
    if (evaluator(board, player)) return 10;
    if (evaluator(board, opponent)) return -10;
    return 0;
}


// algo from  https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/
function minimax(board: board[], depth: number, isMax: boolean, player: string, opponent: string) {
    let score = evaluate(board, player, opponent);

    if (score == 10)
        return score;

    if (score == -10)
        return score;

    if (isMovesLeft(board) == false)
        return 0;

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
                    best = Math.min(best, minimax(board,
                        depth + 1, !isMax, player, opponent));

                    // Undo the move
                    board[i][j] = '_';
                }
            }
        }
        return best;
    }
}

function findBestMove(board: board[], player: string, opponent: string): Move {
    let bestVal = -1000;
    let bestMove = new Move();
    bestMove.row = -1;
    bestMove.col = -1;

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

export const machineBestMove = (markPC: string, markOpponent: string, board: board[]): Move => {
    return findBestMove(board, markPC, markOpponent);
}
