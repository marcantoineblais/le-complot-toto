import React, { useEffect, useRef, useState } from "react"
import HackingSymbols from "./HackingSymbols"
import InfoToto from "./InfoToto"
import Scanner from "./Scanner"
import { random, wait } from "../../helpers"

const HackingScreen = ({ setActive, chars }) => {
  
  const [activeHacking, setActiveHacking] = useState('fadeIn')
  const [isBlinking, setIsBlinking] = useState(true)
  const [rng, setRng] = useState(random(10))
  const [scanDisplay, setScanDisplay] = useState(false)
  const [infoBox, setInfoBox] = useState(false)
  const [freezeHackingSymbols, setFreezeHackingSymbols] = useState(false)
  
  const bgRef = useRef()
  const containerRef = useRef()
  const contentRef = useRef()
  const titleRef = useRef()
  const imgRef = useRef()

  useEffect(() => {

    const animate = async () => {

      switch(activeHacking) {
        case 'fadeIn':
          bgRef.current.classList.remove('blink')
          await wait(4000)
          setActiveHacking('scanner')
          break
        
        case 'scanner':
          setScanDisplay(true)
          titleRef.current.innerHTML = '&_ACCESSING CAMERA_*>'
          await wait(3800)
          setActiveHacking('match')
          setScanDisplay(false)
          break
          
        case 'match':
          setIsBlinking(false)
          contentRef.current.classList.remove('blink')
          titleRef.current.innerHTML = 'MATCH FOUND'
          await wait(800)
          setActiveHacking('identity')
          break

        case 'identity':
          imgRef.current.style.display = "block"
          await wait(50)
          imgRef.current.classList.remove('zoom-out')
          await wait(500)
          contentRef.current.classList.add('right-corner')
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
    
    if (isBlinking) {
      blink()
    }

  }, [isBlinking, rng])

  return (
    <div className="hacking-screen">
      <div className="red-bg blink" ref={bgRef}>
        {!scanDisplay ? <HackingSymbols chars={chars} freeze={freezeHackingSymbols} /> : null}
        <div ref={containerRef} className="container">
          {scanDisplay ? <Scanner /> : null}
          <div ref={contentRef} className="content">
            <h1 ref={titleRef}>&_HACKING_* <br /> #{'>'}_DEVICE+</h1>
            <img
              ref={imgRef}
              className="zoom-out"
              src="https://nyc3.digitaloceanspaces.com/marc-cloud-storage/Shared/le-complot-toto/images/toto-avatar.png"
              alt="avatar de Toto"
            />
          </div>
          {infoBox ? <InfoToto chars={chars} setActive={setActive} freeze={setFreezeHackingSymbols} /> : null}
        </div>
      </div>
    </div>
  )
}

export default HackingScreen