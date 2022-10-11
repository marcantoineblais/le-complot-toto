import React, { useEffect, useRef, useState } from "react"
import { random } from "../helpers"

const VerticalSymbols = ({ chars }) => {

  const [text, setText] = useState("")
  const ref = useRef()

  useEffect(() => {

    ref.current.style.left = `${random(0, 98)}%`
    if (random(2)) {
      ref.current.style.top = "0"
      ref.current.classList.remove('bottom')
      ref.current.classList.add('top')
    } else {
      ref.current.style.bottom = "0"
      ref.current.classList.remove('top')
      ref.current.classList.add('bottom')
    }

    const textArray = []
    let n = 0
    while (n < random(25, 75)) {
      textArray.push(chars[random(chars.length)])
      n += 1
    }
    setText(textArray.join(""))

    
    const movement = setInterval(() => {
      ref.current.style.left = `${(parseInt(ref.current.style.left) + random(5)) % 98}%`
      if (ref.current.style.top) {
        ref.current.style.top = `${(parseInt(ref.current.style.top) + random(-2)) % 5}%`
      } else {
        ref.current.style.bottom = `${(parseInt(ref.current.style.bottom) + random(-2)) % 5}%`
      }
    }, 1000)

    return () => {
      clearInterval(movement)
    }
  }, [chars])

  return (
    <div ref={ref} className="vertical-symbols">{text}</div>
  )
}

export default VerticalSymbols