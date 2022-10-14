import React, { Fragment, useEffect, useRef, useState } from "react"
import HackingScreen from "./HackingScreen"
import LoadingScreen from "./LoadingScreen"
import ErrorScreen from "./ErrorScreen"
import TruthScreen from "./TruthScreen"
import StartScreen from "./StartScreen"
import { wait } from "../../helpers"

const Animation = () => {

  const [startScreen, setStartScreen] = useState(false)
  const [loadingScreen, setLoadingScreen] = useState(false)
  const [hackingScreen, setHackingScreen] = useState(false)
  const [errorScreen, setErrorScreen] = useState(false)
  const [truthScreen, setTruthScreen] = useState(false)
  const [active, setActive] = useState(null)
  const chars = ['-','+','@','?','^','!','&','#','%','$','<','>','0','1','2','3','4','5','6','7','8','9']
  
  const musicRef = useRef()
  const glitchesRef = useRef()

  const playMusic = () => {
    musicRef.current.volume = 0.5
    musicRef.current.play()
  }

  const playGlitches = async () => {
    while (musicRef.current.volume > 0.01) {
      await wait(15)
      musicRef.current.volume = musicRef.current.volume / 2
    }
    musicRef.current.pause()
    glitchesRef.current.volume = 0.5
    glitchesRef.current.play()
  }

  const muteAudio = () => {
    if (musicRef.current.volume === 0) {
      musicRef.current.volume = 0.5
      glitchesRef.current.volume = 0.5
    } else {
      musicRef.current.volume = 0
      glitchesRef.current.volume = 0
    }
  }

  useEffect(() => {
    
    const animate = async () => {

      switch(active) {
        case 'loading':
          setStartScreen(false)
          setLoadingScreen(true)
          await wait(6000)
          setHackingScreen(true)
          break
          
        case 'hacking':
          setLoadingScreen(false)
          break
            
        case 'error':
          setHackingScreen(false)
          setErrorScreen(true)
          break

        case 'truth':
          setStartScreen(false)
          setErrorScreen(false)
          setTruthScreen(true)
          break

        default:
          setStartScreen(true)
      }
    }
    
    animate()
    
  }, [active])

  useEffect(() => {

    if (!startScreen) {
      window.addEventListener('click', muteAudio)
    }

    return () => {
      window.removeEventListener('click', muteAudio)
    }
  }, [startScreen])

  return (
    <Fragment>
      {startScreen ? <StartScreen setActive={setActive} play={playMusic}/> : null}
      {loadingScreen ? <LoadingScreen setActive={setActive}/> : null}
      {hackingScreen ? <HackingScreen setActive={setActive} chars={chars}/> : null}
      {errorScreen ? <ErrorScreen chars={chars} setActive={setActive}/> : null}
      {truthScreen ? <TruthScreen playGlitches={playGlitches} /> : null}
      <audio ref={musicRef} src="https://nyc3.digitaloceanspaces.com/marc-cloud-storage/Shared/le-complot-toto/audio/Cinematic%20Sound%20Effects.mp3"/>
      <audio loop ref={glitchesRef} src="https://nyc3.digitaloceanspaces.com/marc-cloud-storage/Shared/le-complot-toto/audio/Radio%20Glitches.mp3"/>
    </Fragment>
  )
}

export default Animation