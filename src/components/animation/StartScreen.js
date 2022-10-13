import React from "react"

const StartScreen = ({ setActive, play }) => {

  const start = () => {
    setActive('loading')
    play()
  }

  return (
    <div className="start-screen">
      <button
        id="start"
        onClick={ () => start()}>
        <h1>Débuter l'aventure</h1>
      </button>
      <button id="skip" onClick={() => setActive('truth')}>[Skip intro]</button>
    </div>
  )
}

export default StartScreen