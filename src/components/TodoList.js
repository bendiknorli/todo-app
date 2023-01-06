import React, { useState } from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'
import { RiHistoryLine } from "react-icons/ri"
import { BiArrowBack } from "react-icons/bi"
import { useSpring, animated } from 'react-spring'

function TodoList() {

    const [todos, setTodos] = useState([])
    const [history, setHistory] = useState([])
    const [showingHistory, setShowingHistory] = useState(false)
    const [feedbackLabel, setFeedbackLabel] = useState("")
    const [showFeedback, setShowFeedback] = useState(false)

    const props = useSpring({
        to: { opacity: 0 },
        from: { opacity: 1 },
        reverse: showFeedback,
        delay: 400,
        onRest: () => setShowFeedback(false)
    })

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return
        }

        if (todos.find(element => element.text === todo.text.trim())) {
            setFeedbackLabel("This task is already added")
            setShowFeedback(true)
            return
        }

        const newTodos = [todo, ...todos]

        setTodos(newTodos)

        const newHistory = [`Added "${todo.text}"`, ...history]

        setHistory(newHistory)

        setFeedbackLabel("")
    }

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return
        }

        if (todos.find(element => element.text === newValue.text.trim())) {
            setFeedbackLabel("This task already exists")
            setShowFeedback(true)
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
        setFeedbackLabel("")
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
                    <BiArrowBack
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
            <animated.div style={props}>
                <h3 className="feedback">{feedbackLabel}</h3>
            </animated.div>
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