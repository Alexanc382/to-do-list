import React, { useState } from "react";
import type {Todo} from "./types.js";
import "./App.scss";

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState("");
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
    // setTodos - фун-ия для измен. списка задач
    // setInput - ф-ия для измен. текста ввода

    // добавление новой задачи
    const addTodo = () => {
        const text = input.trim(); // удаляем пробелы
        if (!text) return; // текст пустой ничего не возвращаем
        setTodos([...todos, {id: Date.now(), text, completed: false}]);
        setInput("");
    };

    // переключение задач
    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? {...todo, completed: !todo.completed} : todo));
    };

    const clearCompleted = () => {
        setTodos(todos.filter((todo) => !todo.completed));
    };

    const remainingCount = todos.filter(todo => !todo.completed).length; // хранит невыполненные задачи

    const filteredTodos = todos.filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    return (
        <div className="app">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Libertinus+Serif+Display&family=Montserrat:wght@100&display=swap');
            </style>
            <h1>todos</h1>
            <div className="container">  {/*внутренний "белый" блок*/}
                <input // поле ввода задач
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addTodo()}
                    placeholder="What needs to be done?"
                    className="input-style"
                />
                <ul>
                    {filteredTodos.map(todo => (
                        <li key={todo.id} className="listItem">
                            <label className="custom-checkbox">
                                <input // чекбокс
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo.id)}
                                />
                                <span className="checkmark"></span>
                                <span // строка с задачей
                                    onClick={() => toggleTodo(todo.id)}
                                    className={todo.completed ? "task completed" : "task"}>
                                    {todo.text}
                                </span>
                            </label>
                        </li>
                    ))}
                </ul>
                {/*нижний блок*/}
                <div className="footer">
                    <div className="footer-items-count">
                        {remainingCount} items left
                    </div>
                    <div className="footer-items">
                        <button
                            className={`footer-items-name ${filter === "all" ? "active" : ""}`}
                            onClick={() => setFilter("all")}>
                            All
                        </button>
                        <button
                            className={`footer-items-name ${filter === "active" ? "active" : ""}`}
                            onClick={() => setFilter("active")}
                        >
                            Active
                        </button>
                        <button
                            className={`footer-items-name ${filter === "completed" ? "active" : ""}`}
                            onClick={() => setFilter("completed")}
                        >
                            Completed
                        </button>
                    </div>
                        <button className="footer-items-name" onClick={clearCompleted}>
                             Clear completed
                        </button>
                </div>
            </div>
        </div>
    );
};
export default App;
