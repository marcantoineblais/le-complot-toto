import React, { useEffect } from "react"
import { wait } from "../../helpers"
import VerticalSymbols from "./VerticalSymbols"

const ErrorScreen = ({ chars, setActive }) => {

  useEffect(() => {

    const animate = async () => {
      await wait(5000)
      setActive('truth')
    }

    animate()
    
  }, [setActive])

  const renderedSymbols = (n) => {
    const array = []
    let i = 0
    while (i < n) {
      array.push(<VerticalSymbols chars={chars} key={i}/>)
      i += 1
    }

    return array
  }

  return (
    <div className="error-screen">
      <h2 id="fatal">___FATAL_</h2>
      <h2 id="error">_ERROR___</h2>
      {renderedSymbols(50)}
    </div>
  )
}

export default ErrorScreen