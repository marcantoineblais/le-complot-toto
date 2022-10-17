import React, { useEffect, useRef, useState } from "react"
import HackingScreen from "./HackingScreen"
import LoadingScreen from "./LoadingScreen"
import ErrorScreen from "./ErrorScreen"
import TruthScreen from "./TruthScreen"
import StartScreen from "./StartScreen"
import { wait } from "../../helpers"

const Animation = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  const [startScreen, setStartScreen] = useState(false)
  const [loadingScreen, setLoadingScreen] = useState(false)
  const [hackingScreen, setHackingScreen] = useState(false)
  const [errorScreen, setErrorScreen] = useState(false)
  const [truthScreen, setTruthScreen] = useState(false)
  const [active, setActive] = useState(null)
  const [audioElements, setAudioElements] = useState({})
  const [audioLevel, setAudioLevel] = useState(0.5)
  const [audioVolumes, setAudioVolumes] = useState([])
  const chars = ['-','+','@','?','^','!','&','#','%','$','<','>','0','1','2','3','4','5','6','7','8','9']
  
  const containerRef = useRef()
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
    
    if (startScreen) {
      return
    }

    const muteAudio = () => {
      if (audioLevel) {
        setAudioLevel(0)
      } else {
        setAudioLevel(0.5)
      }
    }
    
    const container = containerRef.current
    container.addEventListener('click', muteAudio)
    
    return () => {
      container.removeEventListener('click', muteAudio)
    }
  }, [audioLevel, startScreen])

  useEffect(() => {
    audioVolumes.forEach(source => {
      source.gain.value = audioLevel
    })
  }, [audioLevel, audioVolumes])
  
  
  const playMusic = () => {
    const audioContext = new AudioContext()
    const musicElement = document.getElementById('music') 
    const noiseElement = document.getElementById('noise')

    const music = audioContext.createMediaElementSource(musicElement)
    const musicLevel = audioContext.createGain()
    music.connect(musicLevel).connect(audioContext.destination)

    const noise = audioContext.createMediaElementSource(noiseElement)
    const noiseLevel = audioContext.createGain()
    noise.connect(noiseLevel).connect(audioContext.destination)

    musicElement.play()
    noiseElement.load()

    setAudioVolumes([musicLevel, noiseLevel])
    setAudioElements({music: musicElement, noise: noiseElement})
  }

  const playNoise = async () => {
    audioElements.noise.play()
    while (audioVolumes[0].gain.value > 0.05) {
      audioVolumes[0].gain.value -= 0.05
      await wait(100)
    }
    audioElements.music.pause()
  }

  return (
    <div ref={containerRef} className="animation">
      {startScreen ? <StartScreen setActive={setActive} play={playMusic}/> : null}
      {loadingScreen ? <LoadingScreen setActive={setActive}/> : null}
      {hackingScreen ? <HackingScreen setActive={setActive} chars={chars}/> : null}
      {errorScreen ? <ErrorScreen chars={chars} setActive={setActive}/> : null}
      {truthScreen ? <TruthScreen playNoise={playNoise} /> : null}
      <audio id='music' src="https://nyc3.digitaloceanspaces.com/marc-cloud-storage/Shared/le-complot-toto/audio/Cinematic%20Sound%20Effects.mp3" crossOrigin="anonymous"/>
      <audio loop id='noise' src="https://nyc3.digitaloceanspaces.com/marc-cloud-storage/Shared/le-complot-toto/audio/Radio%20Glitches.mp3" crossOrigin="anonymous"/>
    </div>
  )
}

export default Animation