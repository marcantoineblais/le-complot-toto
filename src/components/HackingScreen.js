import { toBeInTheDOM } from "@testing-library/jest-dom/dist/matchers"
import React, { useEffect, useRef } from "react"
import { random } from "../helpers"
import HackingSymbols from "./HackingSymbols"

const HackingScreen = () => {

  const bgRef = useRef()
  const contentRef = useRef()
  const titleRef = useRef()
  const imgRef = useRef()

  useEffect(() => {
    const fadeIn = setTimeout(() => {
      bgRef.current.classList.remove('blink')
    }, 100)

    const blinking = setInterval(() => {
      if (random(100) < 25) {
        contentRef.current.classList.toggle('blink')
      }
    }, 100)

    const changeText = setTimeout(() => {
      clearInterval(blinking)
      contentRef.current.classList.remove('blink')
      titleRef.current.innerHTML = 'MATCH FOUND'
      // move text box to upper right
      setTimeout(() => {
        titleRef.current.innerHTML = "IDENTITY CONFIRMED"
        contentRef.current.classList.add('right-corner')
        contentRef.current.style.transform = "none"

        // add picture of Toto
        setTimeout(() => {
          imgRef.current.classList.remove('no-display')
        })
      }, 1000)
    }, 6000)

    return () => {
      clearTimeout(fadeIn)
      clearInterval(blinking)
      clearTimeout(changeText)
    }
  }, [])

  return (
    <div className="hacking-screen">
      <div className="red-bg blink" ref={bgRef}>
        <div>
          <HackingSymbols />
        </div>
        <div ref={contentRef} className="content">
          <h1 ref={titleRef}>$HACKING_ <br /> #{'>'}CAMERA+</h1>
          <img ref={imgRef} className="no-display" src="./images/toto-avatar.png" alt="avatar de Toto" />
        </div>
      </div>
    </div>
  )
}

export default HackingScreen