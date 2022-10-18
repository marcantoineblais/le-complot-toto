import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Animation from "./animation/Animation"
import Homepage from "./site/Homepage"
import Server from "./server/Server"

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<Animation />} />
            <Route path="/truth" element={<Homepage />} />
            <Route path="/serveur/654654544hghgfdvfdsvfdshgsgfdsdfhuiowuyrbdjnbs/private" element={<Server />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App