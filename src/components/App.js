import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Animation from "./Animation"

const App = () => {
    return (
        <div className="container">
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Animation />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App