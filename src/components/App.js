import React, { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Animation from "./animation/Animation"
import Homepage from "./site/Homepage"
import Server from "./server/Server"

const App = () => {

  useEffect(() => {
    const body = document.querySelector('body')
    if (body.clientWidth >= 540) {
      body.style.fontSize = '16px'
    } else if (body.clientWidth >= 380) {
      body.style.fontSize = '14px'
    } else if (body.clientWidth < 300) {
      body.style.fontSize = '10px'
    }
  }, [])

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<Animation />} />
            <Route path="/truth" element={<Homepage />} />
            <Route path="/server/" element={<Server />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App