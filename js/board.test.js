import { describe, expect, test } from 'vitest';
import { evaluator } from './index.js';

test('base test', () => {
    expect(evaluator([
        ["_", "_", "_"],
        ["_", "_", "_"],
        ["_", "_", "_"]
    ], "x")).toBeFalsy();
})

describe('test for rows', () => {
    test("win in first row", () => {
        expect(evaluator([
            ["x", "x", "x"],
            ["_", "_", "_"],
            ["_", "_", "_"]
        ], "x")).toBeTruthy();
    })
    test("win in second row", () => {
        expect(evaluator([
            ["_", "_", "_"],
            ["x", "x", "x"],
            ["_", "_", "_"]
        ], "x")).toBeTruthy();
    })
    test("win in third row", () => {
        expect(evaluator([
            ["_", "_", "_"],
            ["_", "_", "_"],
            ["x", "x", "x"]
        ], "x")).toBeTruthy();
    })
})

describe('test for columns', () => {
    test("win in first col", () => {
        expect(evaluator([
            ["x", "_", "_"],
            ["x", "_", "_"],
            ["x", "_", "_"]
        ], "x")).toBeTruthy();
    })
    test("win in second col", () => {
        expect(evaluator([
            ["_", "x", "_"],
            ["_", "x", "_"],
            ["_", "x", "_"]
        ], "x")).toBeTruthy();
    })
    test("win in third col", () => {
        expect(evaluator([
            ["_", "_", "x"],
            ["_", "_", "x"],
            ["_", "_", "x"]
        ], "x")).toBeTruthy();
    })
})

describe('test for diagonales', () => {
    test("win in first dig", () => {
        expect(evaluator([
            ["x", "_", "_"],
            ["_", "x", "_"],
            ["_", "_", "x"]
        ], "x")).toBeTruthy();
    })
    test("win in second dig", () => {
        expect(evaluator([
            ["_", "_", "x"],
            ["_", "x", "_"],
            ["x", "_", "_"]
        ], "x")).toBeTruthy();
    })
})

describe('tie game', () => {
    test("no winner", () => {
        expect(evaluator([
            ["o", "o", "x"],
            ["x", "x", "o"],
            ["o", "x", "x"]
        ], "x")).toBeFalsy();
    })
})
