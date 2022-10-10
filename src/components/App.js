import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const message = (
    <div className="construction-en-cours">
        <h1>Construction en cours</h1>
        <p>Disponible dès le 15 octobre</p>
        <img src="https://www.pngkey.com/png/detail/187-1874320_construction-cone-png-traffic-cones-clipart.png" alt="construction cone" />
    </div>
)

const App = () => {
    return (
        <div className="container">
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={message} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App