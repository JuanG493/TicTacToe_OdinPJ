import { evaluator, isTie } from "./evaluation.js";
import { Move, machineBestMove } from "./minMax.js";
import { getElement, markIcons } from "./util/common.js";

export type board = [string, string, string];

export type htmlClass = {
    [key: string]: string;
}
export type player = {
    name: string
    mark: string
    score: number
}

export type players = { playerOne: player, playerTwo: player }
export type playerKey = keyof typeof players;

const players: players = {
    playerOne: {
        name: "player1",
        mark: "🐱",
        score: 0
    },
    playerTwo: {
        name: "player2",
        mark: "🐶",
        score: 0
    },
}
let messageTimeout: number | null = null;

let currentPlayer: playerKey;

const loadBoard = (): void => {
    let board = getElement("board")
    if (board) {
        for (let col = 0; col < 3; col++) {
            for (let row = 0; row < 3; row++) {
                const element = document.createElement("div")
                element.className = "game-zone__board-element"
                element.id = `${col}_${row}`
                board?.append(element)
            }
        }
    }
}

const randomNumber = (min: number = 0, max: number = 3): number => {
    return Math.floor(Math.random() * (max - min) + min);
}

const randomMoveBoard = (): Move => {
    let move = new Move();
    move.col = randomNumber();
    move.row = randomNumber();
    return move;
}

const starterPlayer = (): playerKey => {
    let random = Math.floor(Math.random() * 2);
    return random === 0 ? "playerOne" : "playerTwo";
}

const showMessage = (message: string, time: number = 3): void => {
    const element = getElement("messages");
    if (element) {
        element.textContent = message;
        if (messageTimeout) clearTimeout(messageTimeout);

        messageTimeout = setTimeout(() => {
            element.textContent = "";
            messageTimeout = null;
            // }, time * 1000);
        }, 99000);
    }
}

const changeSecondPlayer = (name: string, mark: string) => {
    players["playerTwo"].name = name
    players["playerTwo"].mark = mark

    let nameElement = getElement(`nameTwo`, "id")
    let markElement = getElement(`markTwo`, "id")

    if (nameElement && markElement) {
        nameElement.textContent = name;
        markElement.textContent = mark;
    }
}

const disableEnableEdit = (enable: boolean) => {
    const edit = document.querySelector('[data-player="playerTwo"]')
    if (edit && edit instanceof HTMLElement) {
        edit.style.display = enable ? "block" : "none"
    }
}

const disableEnabledButtons = (enable: boolean) => {
    let elemnts = [
        getElement("friend", "id"),
        getElement("machine", "id"),
        getElement("play", "id")
    ]
    for (const element of elemnts) {
        if (element && element instanceof HTMLElement) {
            element.style.display = enable ? "block" : "none";
        }
    }

    let edits = document.querySelectorAll(".player-container__edit")
    edits.forEach((btn) => {
        if (btn instanceof HTMLElement) {
            btn.style.display = enable ? "block" : "none"
        }
    })
}

const toggleModality = (targetElement: Element) => {
    document.querySelectorAll(".cmp-tictactoe__modality-element")
        .forEach((elm) => {
            elm.classList.toggle("cmp-tictactoe__modality-element--active")
        })

    if (targetElement.textContent === "Machine") {
        changeSecondPlayer("Dextro", "😈")
        disableEnableEdit(false)
    } else {
        changeSecondPlayer("player2", "🐶");
        disableEnableEdit(true)
    }
}

const getMode = (): string => {
    let modality = getElement("modality")
    if (modality) {
        return modality.id
    }
    return "friend"
}
const addToscore = (player: player) => {
    player.score += 1;
    let id = currentPlayer == "playerOne" ? "scoreOne" : "scoreTwo";
    let scoreElement = getElement(id, "id")
    if (scoreElement && scoreElement instanceof Element) {
        scoreElement.textContent = player.score.toString();
    }
}
const resetGameBoard = () => {
    const squares = document.querySelectorAll(".game-zone__board-element")
    if (squares.length !== 0) {
        squares.forEach((square) => {
            if (square instanceof Element) {
                square.textContent = ""
            }
            square.addEventListener("click", handleClickSquare, { once: true })
        })
    }
}

const controlMatch = () => {
    const mode = getMode()
    let board = getCurrentBoard()
    let winner = evaluator(board, players[currentPlayer].mark)
    let inGame = true;
    if (!winner && isTie(board)) {
        showMessage("TIE", 4)
        inGame = false;
    } else if (winner) {
        console.log("Winner: ", winner);
        inGame = false;
        showMessage(`${players[currentPlayer].name} is the winner`, 4)
        addToscore(players[currentPlayer])
    } else if (mode === "machine") {
        inGame = machineMove(board)
    }

    if (inGame) {
        changeTurnPlayer();
        showMessage("Turn of " + players[currentPlayer].name, 2)
    } else {
        setTimeout(() => {
            resetGameBoard();
            showMessage("New Round", 5)
            startRound();
        }, 2000);
    }
}
const machineMove = (board: board[]) => {
    changeTurnPlayer();
    let move = machineBestMove(players.playerTwo.mark, players.playerOne.mark, board)
    drawMachineNextMove(move, players.playerTwo.mark)
    let winner = evaluator(getCurrentBoard(), players[currentPlayer].mark)
    if (winner) {
        showMessage(`${players[currentPlayer].name} is the winner`, 4)
        addToscore(players[currentPlayer])
        return false;
    }
    return true;
}


const changeTurnPlayer = () => {
    currentPlayer = currentPlayer === "playerOne" ? "playerTwo" : "playerOne";
}

const handleClickSquare = (event: Event) => {
    const square = event.currentTarget as HTMLAreaElement
    square.textContent = players[currentPlayer].mark;
    controlMatch()
}

const enabledGameZone = () => {
    const squares = document.querySelectorAll(".game-zone__board-element")
    if (squares.length !== 0) {
        squares.forEach((square) => {
            square.addEventListener("click", handleClickSquare, { once: true })
        })
    }
}

const getCurrentBoard = (): board[] => {
    let board: board[] = []
    const squares = document.querySelectorAll(".game-zone__board-element")
    let partial: string[] = [];
    for (let i = 0; i < squares.length; i++) {
        let content = squares[i].textContent
        partial.push(content ? content : "_")
        if (partial.length === 3) {
            board.push(partial as board)
            partial = []
        }
    }
    return board;
}

const drawMachineNextMove = (move: Move, mark: string): void => {
    const square = document.querySelector(`.game-zone__board-element[id="${move.row}_${move.col}"]`);
    square?.removeEventListener("click", handleClickSquare);
    if (square) {
        square.textContent = mark;
    }
}

const startRound = () => {
    disableEnabledButtons(false)
    currentPlayer = starterPlayer()
    showMessage(players[currentPlayer].name + ", star!")
    const mode = getMode()
    if (mode === "machine" && currentPlayer == "playerTwo") {
        drawMachineNextMove(randomMoveBoard(), players[currentPlayer].mark)
        changeTurnPlayer()
    }
    enabledGameZone()
}

const resetGame = () => {
    players.playerOne = {
        name: "player1",
        mark: "🐱",
        score: 0
    };
    players.playerTwo = {
        name: "player2",
        mark: "🐶",
        score: 0
    };
    for (const [key, val] of Object.entries(players)) {
        let suffix = key === "playerOne" ? "One" : "Two";

        let nameElement = getElement(`name${suffix}`, "id")
        let markElement = getElement(`mark${suffix}`, "id")
        let scoreElement = getElement(`score${suffix}`, "id")

        if (nameElement && markElement && scoreElement) {
            nameElement.textContent = val.name;
            markElement.textContent = val.mark;
            scoreElement.textContent = val.score.toString();
        }
    }
    disableEnabledButtons(true);
}

const toggleModal = (action: "close" | "open") => {
    let dialog = getElement("dialog");
    let closeModal = getElement("closeModal", "id");
    if (closeModal && dialog && dialog instanceof HTMLDialogElement) {
        if (action === "close") {
            dialog.close();
        } else {
            const name = getElement("name", "id")
            if (name && name instanceof HTMLInputElement) name.value = "";
            dialog.showModal()
            //TODO resetear el select ?
        }
    }
}

const updatePlayerState = (): void => {

    const newName = getElement("name", "id")
    const newMark = getElement("marker", "id")

    let suffix = currentPlayer === "playerOne" ? "One" : "Two";
    let name = getElement(`name${suffix}`, "id")
    let mark = getElement(`mark${suffix}`, "id")

    //update the object
    if (currentPlayer in players) {
        const activePlayer = players[currentPlayer];
        if (newName && newName instanceof HTMLInputElement && newName.value != "") {
            activePlayer.name = newName.value;
        }
        if (newMark && newMark instanceof HTMLSelectElement && newMark.value != "") {
            activePlayer.mark = newMark.value;
        }
    }

    //update the HTML elements
    if (name && mark) {
        name.textContent = players[currentPlayer].name;
        mark.textContent = players[currentPlayer].mark
    }
}

const handleCloseModal = () => {
    toggleModal("close")
    updatePlayerState()
}

const setupEdit = () => {
    let elemnts = document.querySelectorAll(".player-container__edit")
    if (elemnts) {
        elemnts.forEach((elm) => {
            elm.addEventListener("click", () => {
                const player = elm.getAttribute("data-player");
                //update the currentPlayer
                if (player === "playerOne" || player === "playerTwo") {
                    const actualPlayer: playerKey = player;
                    currentPlayer = actualPlayer;
                }
                toggleModal("open")
            })
        })
    }
}

const makeSelectOptions = () => {
    const select = getElement("marker", "id")
    for (const mark of markIcons) {
        const option = document.createElement("option")
        option.value = mark;
        option.textContent = mark
        select?.appendChild(option)
    }
}

const init = () => {
    loadBoard()
    makeSelectOptions()
    setupEdit()
    const reset = getElement("reset", "id");
    reset?.addEventListener("click", resetGame);
    const closeModal = getElement("closeModal", "id");
    closeModal?.addEventListener("click", () => toggleModal("close"))
    const friend = getElement("friend", "id")
    friend?.addEventListener("click", () => toggleModality(friend))
    const machine = getElement("machine", "id")
    machine?.addEventListener("click", () => toggleModality(machine))
    const play = getElement("play", "id");
    play?.addEventListener("click", startRound);
    const save = getElement("saveName", "id");
    save?.addEventListener("click", handleCloseModal);
}


init()
