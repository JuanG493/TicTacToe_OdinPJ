import { evaluator } from "./evaluation.js";
import { Move, machineBestMove } from "./minMax.js";
import { getElement, markIcons } from "./util/common.js";
const players = {
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
};
let currentPlayer;
const loadBoard = () => {
    let board = getElement("board");
    if (board) {
        for (let col = 0; col < 3; col++) {
            for (let row = 0; row < 3; row++) {
                const element = document.createElement("div");
                element.className = "game-zone__board-element";
                element.id = `${col}_${row}`;
                board?.append(element);
            }
        }
        // for (let i = 0; i < 9; i++) {
        //     const element = document.createElement("div")
        //     element.className = "game-zone__board-element"
        //     element.id = i.toString()
        //     board?.append(element)
        // }
    }
};
const randomNumber = (min = 0, max = 3) => {
    return Math.floor(Math.random() * (max - min) + min);
};
const randomMoveBoard = () => {
    let move = new Move();
    move.col = randomNumber();
    move.row = randomNumber();
    return move;
};
const starterPlayer = () => {
    let random = Math.floor(Math.random() * 2);
    return random === 0 ? "playerOne" : "playerTwo";
};
const showMessage = (message, time = 2500) => {
    const messageElm = getElement("messages");
    if (messageElm) {
        messageElm.textContent = message;
        setInterval(() => {
            messageElm.textContent = "";
        }, time);
    }
};
const changeSecondPlayer = (name, mark) => {
    players["playerTwo"].name = name;
    players["playerTwo"].mark = mark;
    let nameElement = getElement(`nameTwo`, "id");
    let markElement = getElement(`markTwo`, "id");
    if (nameElement && markElement) {
        nameElement.textContent = name;
        markElement.textContent = mark;
    }
};
const disableEnableEdit = (enable) => {
    const edit = document.querySelector('[data-player="playerTwo"]');
    if (edit && edit instanceof HTMLElement) {
        edit.style.display = enable ? "block" : "none";
    }
};
const disableEnabledButtons = (mode) => {
    //disable buttos once the game start
    //mode and button play?
};
const toggleModality = (targetElement) => {
    document.querySelectorAll(".cmp-tictactoe__modality-element")
        .forEach((elm) => {
        elm.classList.toggle("cmp-tictactoe__modality-element--active");
    });
    if (targetElement.textContent === "Machine") {
        changeSecondPlayer("Dextro", "😈");
        disableEnableEdit(false);
    }
    else {
        changeSecondPlayer("player2", "🐶");
        disableEnableEdit(true);
    }
};
const getMode = () => {
    let modality = getElement("modality");
    if (modality) {
        return modality.id;
    }
    return "friend";
};
const controlMatch = () => {
    const mode = getMode();
    let board = getCurrentBoard();
    let winner = evaluator(board, players[currentPlayer].mark);
    console.log(winner);
    if (!winner && board.length === 8) {
        showMessage("TIE");
    }
    else if (winner) {
        showMessage(`${players[currentPlayer].name} is the winner`);
        //ganador -> sumar a la puntuacion
    }
    else {
        //deshablitar el click mientras se hace la jugada?
        if (mode === "machine") {
            //hacer la jugada
            let move = machineBestMove(players.playerTwo.mark, players.playerOne.mark, board);
            console.log(move);
            changeTurnPlayer();
            drawMachineNextMove(move, players[currentPlayer].mark);
        }
        else {
            changeTurnPlayer();
        }
    }
};
const changeTurnPlayer = () => {
    currentPlayer = currentPlayer === "playerOne" ? "playerTwo" : "playerOne";
};
const enabledGameZone = () => {
    const squares = document.querySelectorAll(".game-zone__board-element");
    if (squares.length !== 0) {
        squares.forEach((square) => {
            square.addEventListener("click", () => {
                square.textContent = players[currentPlayer].mark;
                controlMatch();
                // changeTurnPlayer()
            }, { once: true });
        });
    }
};
const getCurrentBoard = () => {
    let board = [];
    const squares = document.querySelectorAll(".game-zone__board-element");
    let partial = [];
    for (let i = 0; i < squares.length; i++) {
        let content = squares[i].textContent;
        partial.push(content ? content : "_");
        if (partial.length === 3) {
            board.push(partial);
            partial = [];
        }
    }
    return board;
};
const drawMachineNextMove = (move, mark) => {
    const square = document.querySelector(`.game-zone__board-element[id="${move.row}_${move.col}"]`);
    if (square) {
        square.textContent = mark;
    }
};
const startGame = () => {
    currentPlayer = starterPlayer();
    showMessage(players[currentPlayer].name + ", star!");
    const mode = getMode();
    if (mode === "machine" && currentPlayer == "playerTwo") {
        drawMachineNextMove(randomMoveBoard(), players[currentPlayer].mark);
        changeTurnPlayer();
    }
    enabledGameZone();
};
const resetGame = () => {
    console.log("asd");
};
const toggleModal = (action) => {
    let dialog = getElement("dialog");
    let closeModal = getElement("closeModal", "id");
    if (closeModal && dialog && dialog instanceof HTMLDialogElement) {
        if (action === "close") {
            dialog.close();
        }
        else {
            const name = getElement("name", "id");
            if (name && name instanceof HTMLInputElement)
                name.value = "";
            dialog.showModal();
            //TODO resetear el select ?
        }
    }
};
const updatePlayerState = () => {
    // const name = getElement("name", "id")
    // const mark = getElement("marker", "id")
    let suffix = currentPlayer === "playerOne" ? "One" : "Two";
    let name = getElement(`name${suffix}`, "id");
    let mark = getElement(`mark${suffix}`, "id");
    //update the object
    if (currentPlayer in players) {
        const activePlayer = players[currentPlayer];
        if (name && name instanceof HTMLInputElement && name.value != "") {
            activePlayer.name = name.value;
        }
        if (mark && mark instanceof HTMLSelectElement && mark.value != "") {
            activePlayer.mark = mark.value;
        }
    }
    //update the HTML elements
    if (name && mark) {
        name.textContent = players[currentPlayer].name;
        mark.textContent = players[currentPlayer].mark;
    }
};
const handleCloseModal = () => {
    toggleModal("close");
    updatePlayerState();
};
const setupEdit = () => {
    let elemnts = document.querySelectorAll(".player-container__edit");
    if (elemnts) {
        elemnts.forEach((elm) => {
            elm.addEventListener("click", () => {
                const player = elm.getAttribute("data-player");
                //update the currentPlayer
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
    const select = getElement("marker", "id");
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
    const reset = getElement("reset", "id");
    reset?.addEventListener("click", resetGame);
    const closeModal = getElement("closeModal", "id");
    closeModal?.addEventListener("click", () => toggleModal("close"));
    const friend = getElement("friend", "id");
    friend?.addEventListener("click", () => toggleModality(friend));
    const machine = getElement("machine", "id");
    machine?.addEventListener("click", () => toggleModality(machine));
    const play = getElement("play", "id");
    play?.addEventListener("click", startGame);
    const save = getElement("saveName", "id");
    save?.addEventListener("click", handleCloseModal);
};
init();
