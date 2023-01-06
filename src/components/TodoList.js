import React, { useState } from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'
import { RiHistoryLine } from "react-icons/ri"

function TodoList() {

    const [todos, setTodos] = useState([])
    const [history, setHistory] = useState([])
    const [showingHistory, setShowingHistory] = useState(false)

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text) || todos.find(element => element.text === todo.text.trim())) {
            return
        }

        const newTodos = [todo, ...todos]

        setTodos(newTodos)

        const newHistory = [`Added "${todo.text}"`, ...history]

        setHistory(newHistory)
    }

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return
        }
        const oldElement = todos.find(todo => todo.id === todoId)

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))

        const newHistory = [`Updated "${oldElement.text}" to "${newValue.text}"`, ...history]


        setHistory(newHistory)
    }

    const removeTodo = id => {
        const removedElement = todos.find(todo => todo.id === id)
        const removeArr = [...todos].filter(todo => todo.id !== id)

        setTodos(removeArr)

        const newHistory = [`Removed "${removedElement.text}"`, ...history]
        setHistory(newHistory)
    }

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete
                const newHistory = todo.isComplete ? [`Completed "${todo.text}"`, ...history] : [`Uncompleted "${todo.text}"`, ...history]
                setHistory(newHistory)
            }
            return todo
        })
        setTodos(updatedTodos)


    }

    const showHistory = () => {
        setShowingHistory(!showingHistory)
        console.log(history)
        console.log(todos)
    }

    if (showingHistory) {
        return (
            <div>
                <h1>History</h1>
                <div className="icons">
                    <RiHistoryLine
                        className="history-icon"
                        onClick={() => showHistory()} />
                </div>
                <Todo history={history} />
            </div>
        )
    }

    return (
        <div>
            <h1>Things to do today</h1>
            <RiHistoryLine
                className="history-icon"
                onClick={() => showHistory()}
            />
            <TodoForm onSubmit={addTodo} />
            <Todo todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo} />
        </div>
    )
}

export default TodoList