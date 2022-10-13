import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { random, sample, wait } from "../../helpers"

const TruthScreen = ({ playGlitches }) => {

  const [glitching, setGlitching] = useState(false)
  const [glitches, setGlitches] = useState(null)
  const linkRef = useRef()
  const backGroundRef = useRef()

  useEffect(() => {
    playGlitches()
  }, [playGlitches])

  useEffect(() => {

    const glitchesList = ['left', 'right', 'top', 'bottom', 'zoom-in', 'zoom-out', 'rotate-left', 'rotate-right', 'inverse-color']
    const animate = async () => {
      let effect = sample(glitchesList, random(1, glitchesList.length)).join(' ')
      while (effect === glitches) {
        effect = sample(glitchesList, random(glitches.lenght)).join(' ')
      }
      await wait(20)
      setGlitches(effect)
      linkRef.current.className = glitches
      if (linkRef.current.classList.contains('inverse-color')) {
        backGroundRef.current.classList.add('inverse-color')
      } else {
        backGroundRef.current.classList.remove('inverse-color')
      }
    }
    
    if (glitching && linkRef.current) { 
      animate()
    } else {
      linkRef.current.className = ""
      backGroundRef.current.classList.remove('inverse-color')
    }

  }, [glitches, glitching])

  useEffect(() => {

    const animate = async () => {
      if (glitching) {
        await wait(random(150, 300))
        setGlitching(false)
      } else {
        await wait(random(1200, 2000))
        setGlitching(true)
      }
    }

    animate()

  }, [glitching])

  return (
    <div ref={backGroundRef} className="truth-screen">
      <Link ref={linkRef} to={'/truth'}>APPRENDRE LA VÉRITÉ</Link>
    </div>
  )
}

export default TruthScreen