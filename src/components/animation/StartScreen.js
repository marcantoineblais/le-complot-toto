import React from "react"
import { Link } from "react-router-dom"

const StartScreen = ({ setActive, play }) => {

  const start = () => {
    setActive('loading')
    play()
  }

  return (
    <div className="start-screen">
      <div className="container">
        <button
          id="start"
          onClick={ () => start()}>
          <h1>Débuter l'aventure</h1>
        </button>
        <Link to={'/truth'} id={'skip'}>[Skip intro]</Link>
      </div>
    </div>
  )
}

export default StartScreen