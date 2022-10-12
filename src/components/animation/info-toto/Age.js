import React, { useEffect, useState } from "react"
import { random, wait } from "../../../helpers"

const Age = ({ chars, setActiveInfo }) => {

  const [text, setText] = useState(" ")
  const [textIndex, setTextIndex] = useState(0)
  const [direction, setDirection] = useState('forward')
  const age = "[ AGE DU SUJET = 40 ANS ]"

  useEffect(() => {

    const animate = async () => {  
      if (['forward', 'backward'].includes(direction)) {
        await wait(20)
        setText(age.slice(0, textIndex) + chars[random(chars.length)])
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
          setText(age)
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

    if (textIndex === age.length - 1) {
      setDirection('changing')
    } else if (direction === 'backward' && !textIndex) {
      setActiveInfo('relatives')
    }
    
    animate()
    
  }, [textIndex, direction, setActiveInfo])

  return (
    <div>{text}</div>
  )
}

export default Age