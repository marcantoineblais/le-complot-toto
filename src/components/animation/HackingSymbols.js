import React, { useEffect, useRef, useState } from "react"
import { wait } from "../../helpers"
import { random } from "../../helpers"

const HackingSymbols = ({ chars, freeze }) => {

  const [symbols, setSymbols] = useState("")
  const [numOfCharacters, setNumOfCharacters] = useState(null)

  const containerRef = useRef()

  useEffect(() => {

    const container = containerRef.current
    console.log(container.clientHeight);
    setNumOfCharacters(Math.floor((container.clientHeight * container.clientWidth) / 164))
    
    container.addEventListener('resize', () => {
      setNumOfCharacters(Math.floor((container.clientHeight * container.clientWidth) / 164))
    })

    return () => {
      container.removeEventListener('resize', () => {
        setNumOfCharacters(Math.floor((container.clientHeight * container.clientWidth) / 164))
      })
    }
  }, [])

  useEffect(() => {

    const animate = async () => {
      let n = 0
      let characters = ""
      while (n < numOfCharacters) {
        characters += chars[random(chars.length)]
        n += 1
      }
      await wait(20)
      setSymbols(characters)
    }

    if (!freeze) {
      animate()
    }

  }, [symbols, chars, freeze, numOfCharacters])


  return (
    <div ref={containerRef} className="symbols">{symbols}</div>
  )
}

export default HackingSymbols