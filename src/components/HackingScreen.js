import React, { useEffect, useRef, useState } from "react"
import { random } from "../helpers"
import HackingSymbols from "./HackingSymbols"
import InfoToto from "./InfoToto"
import Scanner from "./Scanner"

const HackingScreen = ({ done }) => {

  const bgRef = useRef()
  const contentRef = useRef()
  const titleRef = useRef()
  const imgRef = useRef()

  const [scanDisplay, setScanDisplay] = useState('none')
  const [infoBox, setInfoBox] = useState(false)


  useEffect(() => {
    const fadeIn = setTimeout(() => {
      bgRef.current.classList.remove('blink')
    }, 20)

    const blinking = setInterval(() => {
      if (random(100) < 25) {
        contentRef.current.classList.toggle('blink')
      }
    }, 60)

    const scan = setTimeout(() => {
      titleRef.current.innerHTML = '#$ACCESSING _CAMERA!&'
      setScanDisplay('block')
      // Update text box => MATCH FOUND
      setTimeout(() => {
        setScanDisplay("none")
        clearInterval(blinking)
        contentRef.current.classList.remove('blink')
        titleRef.current.innerHTML = 'MATCH FOUND'
        // move text box to upper right => IDENTITY CONFIRMED
        setTimeout(() => {
          titleRef.current.innerHTML = "IDENTITY CONFIRMED"
          contentRef.current.classList.add('right-corner')
          contentRef.current.style.transform = "none"
          // add picture of Toto
          setTimeout(() => {
            imgRef.current.classList.remove('no-display')
            setInfoBox(true)
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
          {infoBox ? <InfoToto done={done} /> : null}
        </div>
      </div>
    </div>
  )
}

export default HackingScreen