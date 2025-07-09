# Tic Tac Toe – TypeScript Edition

This is a rebuilt version of the classic Tic Tac Toe game originally developed in vanilla JavaScript, now refactored using **TypeScript** and **SCSS**. This project is part of [The Odin Project](https://www.theodinproject.com/) curriculum, with a focus on learning and practicing TypeScript in a real-world application.

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
