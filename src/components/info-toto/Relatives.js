import React, { useEffect, useRef, useState } from "react"
import { random } from "../../helpers"

const Relatives = ({ chars, done }) => {

  const [text, setText] = useState("")
  const textRef = useRef()

  useEffect(() => {
    const relatives = "FAMILLE PROCHE: . . .".split("")
    let i = 0
    let n = 0
    let blinking
    const textTimer = setInterval(() => {
      if (i < relatives.length) {
        setText([...relatives.slice(0, i), chars[random(chars.length)]].join(""))
        n += 1
        if (n === 20) {
          i += 1
          n = 0
        }
      } else {
        clearInterval(textTimer)
        setText(relatives.join(""))
        setTimeout(() => {
          blinking = setInterval(() => {
            textRef.current.classList.toggle('blink')
          }, 500)
        }, 100)
      }
    }, 5)

    return () => {
      clearInterval(textTimer)
      clearInterval(blinking)
    }
  }, [chars])

  return (
    <div ref={textRef}>{text}</div>
  )
}

export default Relatives