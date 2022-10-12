import React, { useEffect, useState } from "react"
import { random, wait } from "../../../helpers"

const Name = ({ chars, setActiveInfo }) => {

  const [text, setText] = useState(" ")
  const [textIndex, setTextIndex] = useState(0)
  const [direction, setDirection] = useState('forward')
  const name = "[ NOM DE CODE = TOTO ]"

  useEffect(() => {

    const animate = async () => {  
      if (['forward', 'backward'].includes(direction)) {
        await wait(20)
        setText(name.slice(0, textIndex) + chars[random(chars.length)])
      }  
    }

    animate()

  })

  useEffect(() => {

    const animate = async () => {
      switch(direction) {
        case 'forward':
          await wait(100)
          setTextIndex(textIndex + 1)
          break
        
        case 'changing':
          setText(name)
          await wait(1000)
          setDirection('backward')
          break
        
        case 'backward':
          await wait(20)
          setTextIndex(textIndex - 1)
          break

        default:
          break
      }
    }

    if (textIndex === name.length - 1) {
      setDirection('changing')
    } else if (direction === 'backward' && !textIndex) {
      setActiveInfo('age')
    }
    
    animate()

  }, [textIndex, direction, setActiveInfo])

  return (
    <div className="name">{text}</div>
  )
}

export default Name