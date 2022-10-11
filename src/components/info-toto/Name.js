import React, { useEffect, useState } from "react"
import { random } from "../../helpers"

const Name = ({ chars }) => {

  const [text, setText] = useState(" ")

  useEffect(() => {
    const name = "NOM DE CODE: TOTO".split("")
    let i = 0
    let n = 0
    const textTimer = setInterval(() => {
      if (i < name.length) {
        setText([...name.slice(0, i), chars[random(chars.length)]].join(""))
        n += 1
        if (n === 20) {
          i += 1
          n = 0
        }
      } else {
        clearInterval(textTimer)
        setText(name.join(""))
        setTimeout(() => {
          const removeText = setInterval(() => {
            if (i > 0) {
              setText([...name.slice(0, i), chars[random(chars.length)]].join(""))
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
    <div className="name">{text}</div>
  )
}

export default Name