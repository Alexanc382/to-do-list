import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import "./App.scss";
const App = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");
    const [filter, setFilter] = useState("all");
    // setTodos - фун-ия для измен. списка задач
    // setInput - ф-ия для измен. текста ввода
    // добавление новой задачи
    const addTodo = () => {
        const text = input.trim(); // удаляем пробелы
        if (!text)
            return; // текст пустой ничего не возвращаем
        setTodos([...todos, { id: Date.now(), text, completed: false }]);
        setInput("");
    };
    // переключение задач
    const toggleTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    };
    const clearCompleted = () => {
        setTodos(todos.filter((todo) => !todo.completed));
    };
    const remainingCount = todos.filter(todo => !todo.completed).length; // хранит невыполненные задачи
    const filteredTodos = todos.filter((todo) => {
        if (filter === "active")
            return !todo.completed;
        if (filter === "completed")
            return todo.completed;
        return true;
    });
    return (_jsxs("div", { className: "app", children: [_jsx("style", { children: "@import url('https://fonts.googleapis.com/css2?family=Libertinus+Serif+Display&family=Montserrat:wght@100&display=swap');" }), _jsx("h1", { children: "todos" }), _jsxs("div", { className: "container", children: ["  ", _jsx("input", { value: input, onChange: e => setInput(e.target.value), onKeyDown: e => e.key === "Enter" && addTodo(), placeholder: "What needs to be done?", className: "input-style" }), _jsx("ul", { children: filteredTodos.map(todo => (_jsx("li", { className: "listItem", children: _jsxs("label", { className: "custom-checkbox", children: [_jsx("input", { type: "checkbox", checked: todo.completed, onChange: () => toggleTodo(todo.id) }), _jsx("span", { className: "checkmark" }), _jsx("span", { onClick: () => toggleTodo(todo.id), className: todo.completed ? "task completed" : "task", children: todo.text })] }) }, todo.id))) }), _jsxs("div", { className: "footer", children: [_jsxs("div", { className: "footer-items-count", children: [remainingCount, " items left"] }), _jsxs("div", { className: "footer-items", children: [_jsx("button", { className: `footer-items-name ${filter === "all" ? "active" : ""}`, onClick: () => setFilter("all"), children: "All" }), _jsx("button", { className: `footer-items-name ${filter === "active" ? "active" : ""}`, onClick: () => setFilter("active"), children: "Active" }), _jsx("button", { className: `footer-items-name ${filter === "completed" ? "active" : ""}`, onClick: () => setFilter("completed"), children: "Completed" })] }), _jsx("button", { className: "footer-items-name", onClick: clearCompleted, children: "Clear completed" })] })] })] }));
};
export default App;
