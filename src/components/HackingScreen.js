import React, { useEffect, useRef, useState } from "react"
import { random } from "../helpers"
import HackingSymbols from "./HackingSymbols"
import Scanner from "./Scanner"

const HackingScreen = () => {

  const bgRef = useRef()
  const contentRef = useRef()
  const titleRef = useRef()
  const imgRef = useRef()

  const [scanDisplay, setScanDisplay] = useState('none')

  useEffect(() => {
    const fadeIn = setTimeout(() => {
      bgRef.current.classList.remove('blink')
    }, 100)

    const blinking = setInterval(() => {
      if (random(100) < 25) {
        contentRef.current.classList.toggle('blink')
      }
    }, 60)

    const scan = setTimeout(() => {
      titleRef.current.innerHTML = '#$ACCESSING _CAMERA!&'
      setScanDisplay('block')
      // Update text box
      setTimeout(() => {
        setScanDisplay("none")
        titleRef.current.innerHTML = 'MATCH FOUND'
        // move text box to upper right
        setTimeout(() => {
          clearInterval(blinking)
          contentRef.current.classList.remove('blink')
          titleRef.current.innerHTML = "IDENTITY CONFIRMED"
          contentRef.current.classList.add('right-corner')
          contentRef.current.style.transform = "none"
          
          // add picture of Toto
          setTimeout(() => {
            imgRef.current.classList.remove('no-display')
          })
        }, 1000)
      }, 4000)
    }, 5000)

    return () => {
      clearTimeout(fadeIn)
      clearInterval(blinking)
      clearTimeout(scan)
    }
  }, [])

  return (
    <div className="hacking-screen">
      <div className="red-bg blink" ref={bgRef}>
        <div>
          <HackingSymbols />
          <Scanner display={scanDisplay}/>
        </div>
        <div ref={contentRef} className="content">
          <h1 ref={titleRef}>$HACKING_ <br /> #{'>'}DEVICE+</h1>
          <img ref={imgRef} className="no-display" src="./images/toto-avatar.png" alt="avatar de Toto" />
        </div>
      </div>
    </div>
  )
}

export default HackingScreen