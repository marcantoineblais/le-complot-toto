import React, { Fragment, useEffect, useState } from "react"
import { random } from "../helpers"

const HackingSymbols = () => {

  const [symbols, setSymbols] = useState("")

  useEffect(() => {
    const chars = ['-','+','@','?','^','!','&','#','%','$','<','>','0','1','2','3','4','5','6','7','8','9']
    const loadingProgression = setInterval(() => {
      let n = 0
      let characters = []
      while (n < 3000) {
        characters.push(chars[random(chars.length)])
        n += 1
      }
      setSymbols(characters.join(""))
    }, 5)

    return () => {
      clearInterval(loadingProgression)
    }
  }, [symbols])

  return (
    <Fragment>{symbols}</Fragment>
  )
}

export default HackingSymbols