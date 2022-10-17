import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Animation from "./animation/Animation"
import Homepage from "./site/Homepage"

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<Animation />} />
            <Route path="/truth" element={<Homepage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App