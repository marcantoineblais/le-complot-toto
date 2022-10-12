import React, { useEffect, useRef } from "react"
import { wait } from "../../helpers"
import VerticalSymbols from "./VerticalSymbols"

const ErrorScreen = ({ chars, setActive }) => {

  const errorRef = useRef()

  useEffect(() => {

    const animate = async () => {
      await wait(5000)
      errorRef.current.classList.add('blink')
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
    <div ref={errorRef} className="error-screen">
      {renderedSymbols(50)}
      <h2 id="fatal">___FATAL_</h2>
      <h2 id="error">_ERROR___</h2>
    </div>
  )
}

export default ErrorScreen