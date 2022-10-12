import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Animation from "./animation/Animation"
import Homepage from "./site/Homepage"

const App = () => {
    return (
        <div className="container">
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Animation />} />
                    <Route path="/truth" element={<Homepage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App