import { evaluator } from "./evaluation.js";
import { getElment, markIcons } from "./util/common.js";

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

let currentPlayer: playerKey;

const loadBoard = (): void => {
    let board = getElment("board")
    if (board) {
        for (let i = 0; i < 9; i++) {
            const element = document.createElement("div")
            element.className = "game-zone__board-element"
            element.id = i.toString()
            board?.append(element)
        }
    }
}

const starterPlayer = (): playerKey => {
    let random = Math.floor(Math.random() * 2);
    return random === 0 ? "playerOne" : "playerTwo";
}

const showMessage = (message: string, time: number = 2500): void => {
    const messageElm = getElment("messages")
    if (messageElm) {
        messageElm.textContent = message;
        setInterval(() => {
            messageElm.textContent = "";
        }, time);
    }
}


const toggleModality = () => {
    document.querySelectorAll(".cmp-tictactoe__modality-element")
        .forEach((elm) => {
            elm.classList.toggle("cmp-tictactoe__modality-element--active")
        })
}


const getMode = (): string => {
    let modality = getElment("modality")
    if (modality) {
        return modality.id
    }
    return "friend"
}



const enabledGameZone = () => {
    const squares = document.querySelectorAll(".game-zone__board-element")
    if (squares.length !== 0) {
        squares.forEach((square) => {
            square.addEventListener("click", () => {
                square.textContent = players[currentPlayer].mark;
                controlMatch()
                currentPlayer = currentPlayer === "playerOne" ? "playerTwo" : "playerOne";
            }, { once: true })
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

const controlMatch = () => {
    let board = getCurrentBoard()
    let winner = evaluator(board, players[currentPlayer].mark)
    console.log(winner);
    if (!winner && board.length === 8) {
        showMessage("TIE")
    } else if (winner) {
        showMessage(`${players[currentPlayer].name} is the winner`)
    }
    //ganador -> sumar a la puntuacion
}

const startGame = () => {
    currentPlayer = starterPlayer()
    showMessage(players[currentPlayer].name + ", star!")
    enabledGameZone()

    // controlMatch(players[currentPlayer])

    //TODO y el modo?

}


const resetGame = () => {
    console.log("asd");
}


const toggleModal = (action: "close" | "open") => {
    let dialog = getElment("dialog");
    let closeModal = getElment("closeModal", "id");
    if (closeModal && dialog && dialog instanceof HTMLDialogElement) {
        if (action === "close") {
            dialog.close();
        } else {
            const name = getElment("name", "id")
            if (name && name instanceof HTMLInputElement) name.value = "";
            dialog.showModal()
            //TODO resetear el select ?
        }
    }
}
const updatePlayerState = (): void => {
    console.log(players);
    console.log(currentPlayer);

    let suffix = currentPlayer === "playerOne" ? "One" : "Two";
    let name = getElment(`name${suffix}`, "id")
    let mark = getElment(`mark${suffix}`, "id")
    if (name && mark) {
        name.textContent = players[currentPlayer].name;
        mark.textContent = players[currentPlayer].mark
    }
}

const handleCloseModal = () => {
    toggleModal("close")
    let name = getElment("name", "id")
    if (name && name instanceof HTMLInputElement && name.value != "") {
        if (currentPlayer in players) {
            const activePlayer = players[currentPlayer];
            activePlayer.name = name.value;
        }
    }
    let marker = getElment("marker", "id")
    if (marker && marker instanceof HTMLSelectElement && marker.value != "") {
        if (currentPlayer in players) {
            const activePlayer = players[currentPlayer];
            activePlayer.mark = marker.value;
        }
    }
    updatePlayerState()
}

const setupEdit = () => {
    let elemnts = document.querySelectorAll(".player-container__edit")
    if (elemnts) {
        elemnts.forEach((elm) => {
            elm.addEventListener("click", () => {
                const player = elm.getAttribute("data-player");
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
    const select = getElment("marker", "id")
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
    const reset = getElment("reset", "id");
    reset?.addEventListener("click", resetGame);
    const closeModal = getElment("closeModal", "id");
    closeModal?.addEventListener("click", () => toggleModal("close"))
    const friend = getElment("friend", "id")
    friend?.addEventListener("click", toggleModality)
    const machine = getElment("machine", "id")
    machine?.addEventListener("click", toggleModality)
    const play = getElment("play", "id");
    play?.addEventListener("click", startGame);
    const save = getElment("saveName", "id");
    save?.addEventListener("click", handleCloseModal);

}


init()
