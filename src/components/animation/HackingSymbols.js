import React, { Fragment, useEffect, useState } from "react"
import { wait } from "../../helpers"
import { random } from "../../helpers"

const HackingSymbols = ({ chars, freeze }) => {

  const [symbols, setSymbols] = useState("")

  useEffect(() => {

    const animate = async () => {
      let n = 0
      let characters = ""
      while (n < 2000) {
        characters += chars[random(chars.length)]
        n += 1
      }
      await wait(20)
      setSymbols(characters)
    }

    if (!freeze) {
      animate()
    }

  }, [symbols, chars, freeze])

  return (
    <Fragment>{symbols}</Fragment>
  )
}

export default HackingSymbols