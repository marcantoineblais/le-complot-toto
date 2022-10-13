import React, { useEffect, useRef, useState } from "react"
import { random, wait } from "../../../helpers"

const Relatives = ({ chars, setActiveInfo, freeze }) => {

  const [text, setText] = useState(" ")
  const [textIndex, setTextIndex] = useState(0)
  const [direction, setDirection] = useState('forward')
  const [blinking, setBlinking] = useState(false)
  const age = "[ FAMILLE PROCHE = . . . ]"

  const textRef = useRef()

  useEffect(() => {

    const animate = async () => {  
      if (direction === 'forward') {
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
          setDirection('blinking')
          break
        
        case 'blinking':
          freeze(true)
          await wait(4500)
          setActiveInfo('error')
          break

        default:
          break
      }
    }

    if (textIndex === age.length - 1) {
      setDirection('changing')
    }
    
    animate()
    
  }, [textIndex, direction, setActiveInfo, freeze])

  useEffect(() => {
    
    const animate = async () => {
      await wait(500)
      if (!blinking && textRef.current) {
        textRef.current.classList.add('blink')
        setBlinking(true)
      } else if (textRef.current) {
        textRef.current.classList.remove('blink')
        setBlinking(false)
      }
    }

    if (direction === "blinking") {
      animate()
    }
  }, [blinking, direction])

  return (
    <div ref={textRef}>{text}</div>
  )
}

export default Relatives