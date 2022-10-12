import React, { useEffect, useRef, useState } from "react"
import { random, wait } from "../helpers"

const VerticalSymbols = ({ chars }) => {

  const [text, setText] = useState("")
  const [positionX, setPositionX] = useState(random(98))
  const [positionY, setPositionY] = useState(random(-2, 3))
  const [orientation] = useState(random(2) ? 'top' : 'bottom')
  const ref = useRef()

  useEffect(() => {
    const animate = async () => {
      await wait(20)
      ref.current.style.left = `${positionX}%`
      if (orientation === 'top') {
        ref.current.style.top = `${positionY}%`
      } else {
        ref.current.style.bottom = `${positionY}%`
      }

      setPositionX((positionX + random(1, 6)) % 100)
      setPositionY((positionY - random(1, 6)) % 10)
    }

    animate()
  })

  useEffect(() => {
    let n = 0
    let t = ""

    if (orientation === 'top') {
      ref.current.classList.add('top')
    } else {
      ref.current.classList.add('bottom')
    }

    while (n < random(50, 100)) {
      t += chars[random(chars.length)]
      n += 1
    }

    setText(t)
  }, [chars, orientation])

  return (
    <div ref={ref} className="vertical-symbols">{text}</div>
  )
}

export default VerticalSymbols