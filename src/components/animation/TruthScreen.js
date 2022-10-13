import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { random, sample, wait } from "../../helpers"

const TruthScreen = ({ playGlitches }) => {

  const [glitching, setGlitching] = useState(false)
  const [glitches, setGlitches] = useState(null)
  const linkRef = useRef()

  useEffect(() => {
    playGlitches()
  }, [playGlitches])

  useEffect(() => {

    const glitchesList = ['left', 'right', 'top', 'bottom', 'zoom-in', 'zoom-out', 'rotate-left', 'rotate-right']
    const animate = async () => {
      let effect = sample(glitchesList, random(1, glitchesList.length)).join(' ')
      while (effect === glitches) {
        effect = sample(glitchesList, random(glitches.lenght)).join(' ')
      }
      await wait(5)
      setGlitches(effect)
      linkRef.current.className = glitches
    }
    
    if (glitching && linkRef.current) { 
      animate()
    } else {
      linkRef.current.className = ""
    }

  }, [glitches, glitching])

  useEffect(() => {

    const animate = async () => {
      if (glitching) {
        await wait(random(150, 300))
        setGlitching(false)
      } else {
        await wait(random(1800, 2200))
        setGlitching(true)
      }
    }

    animate()

  }, [glitching])

  return (
    <div className="truth-screen">
      <Link ref={linkRef} to={'/truth'}>APPRENDRE LA VÉRITÉ</Link>
    </div>
  )
}

export default TruthScreen