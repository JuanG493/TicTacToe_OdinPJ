import { getElment, markIcons } from "./util/common.js";
const players = {
    playerOne: {
        name: "player1",
        mark: "x",
        score: 0
    },
    playerTwo: {
        name: "player1",
        mark: "o",
        score: 0
    },
};
let currentPlayer;
// const createPlayer = (name: string, mark: string, score: number): player => {
//     return { name, mark, score }
// }
const checkEquality = (board, marker) => {
    return board[0] === marker && board[1] === marker && board[2] === marker;
};
export const evaluator = (board, marker) => {
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
const markPosition = (element) => {
    console.log(element.innerHTML == "");
};
const loadBoard = () => {
    let board = getElment("board");
    if (board) {
        for (let i = 0; i < 9; i++) {
            const element = document.createElement("div");
            element.className = "game-zone__board-element";
            element.id = i.toString();
            element.addEventListener('click', () => markPosition(element));
            board?.append(element);
        }
    }
};
const starterPlayer = () => {
    let random = Math.floor(Math.random() * 2);
    return random === 0 ? "one" : "two";
};
const showMessage = (message) => {
    const messageElm = getElment("messages");
    if (messageElm) {
        messageElm.textContent = message;
        setInterval(() => {
            messageElm.textContent = "";
        }, 2500);
    }
};
const toggleModality = () => {
    document.querySelectorAll(".cmp-tictactoe__modality-element")
        .forEach((elm) => {
        elm.classList.toggle("cmp-tictactoe__modality-element--active");
    });
};
const getMode = () => {
    let modality = getElment("modality");
    if (modality) {
        return modality.id;
    }
    return "friend";
};
const startGame = () => {
    if (getMode() === "friend") {
        toggleModal("open");
        //machine logic
    }
    else {
    }
    //elegir quien empieza
    let currentPlayer = starterPlayer();
    showMessage(currentPlayer === "one" ? "player one turn" : "player two turn");
    //mostrar quien empieza
    //
};
const resetGame = () => {
    console.log("asd");
};
const toggleModal = (action) => {
    let dialog = getElment("dialog");
    let closeModal = getElment("closeModal", "id");
    if (closeModal && dialog && dialog instanceof HTMLDialogElement) {
        if (action === "close") {
            dialog.close();
        }
        else {
            const name = getElment("name", "id");
            if (name && name instanceof HTMLInputElement)
                name.value = "";
            dialog.showModal();
            //TODO resetear el select ?
        }
    }
};
const updatePlayerState = () => {
    console.log(players);
    console.log(currentPlayer);
    let suffix = currentPlayer === "playerOne" ? "One" : "Two";
    let name = getElment(`name${suffix}`, "id");
    let mark = getElment(`mark${suffix}`, "id");
    if (name && mark) {
        name.textContent = players[currentPlayer].name;
        mark.textContent = players[currentPlayer].mark;
    }
};
const handleCloseModal = () => {
    toggleModal("close");
    let name = getElment("name", "id");
    if (name && name instanceof HTMLInputElement) {
        if (currentPlayer in players) {
            const activePlayer = players[currentPlayer];
            activePlayer.name = name.value;
        }
    }
    let marker = getElment("marker", "id");
    if (marker && marker instanceof HTMLSelectElement) {
        if (currentPlayer in players) {
            const activePlayer = players[currentPlayer];
            activePlayer.mark = marker.value;
        }
    }
    updatePlayerState();
};
const setupEdit = () => {
    let elemnts = document.querySelectorAll(".player-container__edit");
    if (elemnts) {
        elemnts.forEach((elm) => {
            elm.addEventListener("click", () => {
                const player = elm.getAttribute("data-player");
                if (player === "playerOne" || player === "playerTwo") {
                    const actualPlayer = player;
                    currentPlayer = actualPlayer;
                }
                toggleModal("open");
            });
        });
    }
};
const makeSelectOptions = () => {
    const select = getElment("marker", "id");
    for (const mark of markIcons) {
        const option = document.createElement("option");
        option.value = mark;
        option.textContent = mark;
        select?.appendChild(option);
    }
};
const init = () => {
    loadBoard();
    makeSelectOptions();
    setupEdit();
    let reset = getElment("reset", "id");
    reset?.addEventListener("click", resetGame);
    let closeModal = getElment("closeModal", "id");
    closeModal?.addEventListener("click", () => toggleModal("close"));
    let saveName = getElment("saveName", "id");
    saveName?.addEventListener("click", () => handleCloseModal);
    const friend = getElment("friend", "id");
    friend?.addEventListener("click", toggleModality);
    const machine = getElment("machine", "id");
    machine?.addEventListener("click", toggleModality);
    let play = getElment("play", "id");
    play?.addEventListener("click", startGame);
    const save = getElment("saveName", "id");
    save?.addEventListener("click", handleCloseModal);
};
init();
