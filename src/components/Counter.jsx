import React, { useState } from 'react'

export const Counter = function() {
    const [count, setCOunt] = useState(0)

    function increment() {
        setCOunt(count + 1)
    }

    function decrement() {
        setCOunt(count - 1)
    }

    return(
        <div>
            <h1>{count}</h1>
            <button onClick={increment} >increment</button>
            <button onClick={decrement} >increment</button>
        </div>
    )
}
