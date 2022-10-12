import { wait } from "@testing-library/user-event/dist/utils"
import React, { useEffect, useRef, useState } from "react"
import { random } from "../helpers"
import HackingSymbols from "./HackingSymbols"
import InfoToto from "./InfoToto"
import Scanner from "./Scanner"

const HackingScreen = ({ setActive, chars }) => {

  const bgRef = useRef()
  const contentRef = useRef()
  const titleRef = useRef()
  const imgRef = useRef()

  const [activeHacking, setActiveHacking] = useState('fadeIn')
  const [isBlinking, setIsBlinking] = useState(true)
  const [rng, setRng] = useState(random(10))
  const [scanDisplay, setScanDisplay] = useState('none')
  const [infoBox, setInfoBox] = useState(false)


  useEffect(() => {

    const animate = async () => {

      switch(activeHacking) {
        case 'fadeIn':
          bgRef.current.classList.remove('blink')
          await wait(5000)
          setActiveHacking('scanner')
          break
        
        case 'scanner':
          titleRef.current.innerHTML = '#$ACCESSING _CAMERA!&'
          setScanDisplay('block')
          await wait(4000)
          setActiveHacking('match')
          break

        case 'match':
          setIsBlinking(false)
          setScanDisplay("none")
          contentRef.current.classList.remove('blink')
          titleRef.current.innerHTML = 'MATCH FOUND'
          await wait(1000)
          setActiveHacking('identity')
          break

        case 'identity':
          imgRef.current.classList.remove('no-display')
          await wait(500)
          contentRef.current.classList.add('right-corner')
          contentRef.current.style.transform = 'translate(0)'
          await wait(1000)
          setInfoBox(true)
          break

        default:
          setActiveHacking(null)
      }
    }

    animate()

  }, [activeHacking])

  useEffect(() => {

    const blink = async () => {
      if (isBlinking) {
        await wait(50)
        if (rng < 2) {
          contentRef.current.classList.add('blink')
          await wait(50)
          contentRef.current.classList.remove('blink')
        } 
        let num = random(10)
        while (num === rng) {
          num = random(10)
        }
        setRng(num)
      }
    }
    
    blink()
  })

  return (
    <div className="hacking-screen">
      <div className="red-bg blink" ref={bgRef}>
        <div>
          <HackingSymbols chars={chars}/>
          <Scanner display={scanDisplay}/>
        </div>
        <div ref={contentRef} className="content">
          <h1 ref={titleRef}>$HACKING_ <br /> #{'>'}DEVICE+</h1>
          <img ref={imgRef} className="no-display" src="./images/toto-avatar.png" alt="avatar de Toto" />
          {infoBox ? <InfoToto setActive={setActive} /> : null}
        </div>
      </div>
    </div>
  )
}

export default HackingScreen