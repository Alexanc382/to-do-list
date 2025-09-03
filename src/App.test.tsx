// src/__tests__/App.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App.js";

describe("Todo App", () => {
    test("добавление новой задачи", () => {
        render(<App />);
        const input = screen.getByPlaceholderText("What needs to be done?");

        fireEvent.change(input, { target: { value: "Новая задача" } });
        fireEvent.keyDown(input, { key: "Enter" });

        expect(screen.getByText("Новая задача")).toBeInTheDocument();
    });

    test("переключение выполнения задачи", () => {
        render(<App />);
        const input = screen.getByPlaceholderText("What needs to be done?");

        fireEvent.change(input, { target: { value: "Задача для переключения" } });
        fireEvent.keyDown(input, { key: "Enter" });

        const task = screen.getByText("Задача для переключения");
        expect(task).not.toHaveClass("completed");

        fireEvent.click(task);
        expect(task).toHaveClass("completed");

        fireEvent.click(task);
        expect(task).not.toHaveClass("completed");
    });

    test("очистка выполненных задач", () => {
        render(<App />);
        const input = screen.getByPlaceholderText("What needs to be done?");

        fireEvent.change(input, { target: { value: "Задача 1" } });
        fireEvent.keyDown(input, { key: "Enter" });
        fireEvent.change(input, { target: { value: "Задача 2" } });
        fireEvent.keyDown(input, { key: "Enter" });

        const task1 = screen.getByText("Задача 1");
        fireEvent.click(task1);

        const clearButton = screen.getByText("Clear completed");
        fireEvent.click(clearButton);

        expect(screen.queryByText("Задача 1")).not.toBeInTheDocument();
        expect(screen.getByText("Задача 2")).toBeInTheDocument();
    });

    test("фильтрация задач по статусу", () => {
        render(<App />);
        const input = screen.getByPlaceholderText("What needs to be done?");

        fireEvent.change(input, { target: { value: "Активная задача" } });
        fireEvent.keyDown(input, { key: "Enter" });
        fireEvent.change(input, { target: { value: "Выполненная задача" } });
        fireEvent.keyDown(input, { key: "Enter" });

        const completedTask = screen.getByText("Выполненная задача");
        fireEvent.click(completedTask);

        const activeFilter = screen.getByText("Active");
        fireEvent.click(activeFilter);

        expect(screen.getByText("Активная задача")).toBeInTheDocument();
        expect(screen.queryByText("Выполненная задача")).not.toBeInTheDocument();

        const completedFilter = screen.getByText("Completed");
        fireEvent.click(completedFilter);

        expect(screen.queryByText("Активная задача")).not.toBeInTheDocument();
        expect(screen.getByText("Выполненная задача")).toBeInTheDocument();
    });
});
