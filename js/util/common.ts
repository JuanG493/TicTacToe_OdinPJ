import { htmlClass } from "../index";

export const markIcons: string[] = [
    "❌",
    "⭕",
    "🥒",
    "🍑",
    "🍆",
    "😈",
    "🔥",
    "❌",
    "⭕",
    "🐷",
    "🐴",
    "🐶",
    "🐱",
    "🐸",
    "🐵",
    "👽",
    "🦄",
    "👑",
    "🧸",
    "💥",
    "🎯",
    "💀",
];

export const getElement = (key: string, by: "id" | "class" = "class"): Element | null => {
    const classList: htmlClass = {
        board: "game-zone__board",
        messages: "cmp-tictactoe__messages",
        play: "play",
        friend: "friend",
        machine: "machine",
        reset: "reset",
        nameOne: "nameOne",
        nameTwo: "nameTwo",
        markOne: "markOne",
        markTwo: "markTwo",
        scoreOne: "scorePjOne",
        scoreTwo: "scorePjTwo",
        dialog: "cmp-tictactoe__name-modal",
        closeModal: "closeModal",
        infoPj: "sendPjInfo",
        modality: "cmp-tictactoe__modality-element--active",
        marker: "marker",
        name: "name",
        saveName: "saveName",
    }
    let element = document.querySelector(`${by === "class" ? '.' : '#'}${classList[key]}`)
    if (!element) {
        console.error(`Error getting the element by the ${by}: ${key}`)
        return null;
    } else {
        return element
    }
}
