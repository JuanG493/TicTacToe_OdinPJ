# Tic Tac Toe – TypeScript Edition

This project is a rebuilt version of the classic Tic Tac Toe game, originally developed in vanilla JavaScript and now refactored using TypeScript and SCSS.
It is part of The Odin Project curriculum, focused on learning and practicing modern web development.

live version of the game here:
🔗 https://juang493.github.io/TicTacToe_OdinPJ/
---

## Purpose

The main goal of this rebuild was to deepen understanding of **TypeScript's type system**, improve code structure, and apply modular architecture while maintaining the game’s original functionality.

---

## Features

- Classic 3×3 Tic Tac Toe logic
- Reusable TypeScript types (`board`, `Move`, `players`, etc.)
- Minimax algorithm for the AI opponent
- Modular architecture (`minMax.ts`, `evaluation.ts`, `common.ts`, etc.)
- SCSS-based styling with global variables and component-specific design
- Custom UI with `<dialog>` for player nickname input
- Responsive game board with emoji or letter markers
- Unit tests with **Vitest** for `evaluator` function

---

## Tech Stack

- **TypeScript** – Strictly typed logic and reusable components
- **SCSS** – Modular and customizable styling
- **HTML5 `<dialog>`** – Native modal for name input
- **Vitest** – Lightweight test runner for TypeScript
