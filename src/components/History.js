import React from 'react'

function History({ history }) {
    return history.map((event, index) => (
        <div className="todo-row" key={index}>
            <div key={index}>
                {event}
            </div>
        </div>
    )
    )
}

export default History