import React, { Fragment, useEffect, useState } from "react"
import { random } from "../helpers"

const HackingSymbols = ({ chars }) => {

  const [symbols, setSymbols] = useState("")

  useEffect(() => {
    const loadingProgression = setInterval(() => {
      let n = 0
      let characters = []
      while (n < 3000) {
        characters.push(chars[random(chars.length)])
        n += 1
      }
      setSymbols(characters.join(""))
    }, 20)

    return () => {
      clearInterval(loadingProgression)
    }
  }, [symbols, chars])

  return (
    <Fragment>{symbols}</Fragment>
  )
}

export default HackingSymbols