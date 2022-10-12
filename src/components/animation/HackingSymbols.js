import React, { Fragment, useEffect, useState } from "react"
import { wait } from "../../helpers"
import { random } from "../../helpers"

const HackingSymbols = ({ chars }) => {

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

    animate()

  }, [symbols, chars])

  return (
    <Fragment>{symbols}</Fragment>
  )
}

export default HackingSymbols