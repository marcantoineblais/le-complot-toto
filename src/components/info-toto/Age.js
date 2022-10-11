import React, { useEffect, useState } from "react"
import { random } from "../../helpers"

const Age = ({ chars }) => {

  const [text, setText] = useState("")

  useEffect(() => {
    const age = "AGE DU SUJET: 40 ANS".split("")
    let i = 0
    let n = 0
    const textTimer = setInterval(() => {
      if (i < age.length) {
        setText([...age.slice(0, i), chars[random(chars.length)]].join(""))
        n += 1
        if (n === 20) {
          i += 1
          n = 0
        }
      } else {
        clearInterval(textTimer)
        setText(age.join(""))
        setTimeout(() => {
          const removeText = setInterval(() => {
            if (i > 0) {
              setText([...age.slice(0, i), chars[random(chars.length)]].join(""))
              n += 1
              if (n === 20) {
                i -= 1
                n = 0
              }
            } else {
              clearInterval(removeText)
              setText("")
            }
          }, 2)
        }, 1000)
      }
    }, 5)

    return () => {
      clearInterval(textTimer)
    }
  }, [chars])

  return (
    <div>{text}</div>
  )
}

export default Age