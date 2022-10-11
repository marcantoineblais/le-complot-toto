import React from "react"
import VerticalSymbols from "./VerticalSymbols"

const ErrorScreen = () => {

  const chars = ['-','+','@','?','^','!','&','#','%','$','<','>','0','1','2','3','4','5','6','7','8','9']

  return (
    <div className="error-screen">
      <VerticalSymbols chars={chars} />
      <VerticalSymbols chars={chars} />
      <VerticalSymbols chars={chars} />
      <VerticalSymbols chars={chars} />
      <VerticalSymbols chars={chars} />
      <VerticalSymbols chars={chars} />
      <VerticalSymbols chars={chars} />
      <VerticalSymbols chars={chars} />
      <VerticalSymbols chars={chars} />
      <VerticalSymbols chars={chars} />
      <VerticalSymbols chars={chars} />
      <VerticalSymbols chars={chars} />
      <VerticalSymbols chars={chars} />
      <VerticalSymbols chars={chars} />
      <VerticalSymbols chars={chars} />
      <VerticalSymbols chars={chars} />
      <VerticalSymbols chars={chars} />
      <VerticalSymbols chars={chars} />
      <VerticalSymbols chars={chars} />
      <VerticalSymbols chars={chars} />
      <h2 id="fatal">___FATAL_</h2>
      <h2 id="error">_ERROR___</h2>
    </div>
  )
}

export default ErrorScreen