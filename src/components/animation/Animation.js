import React, { Fragment, useEffect, useState } from "react"
import HackingScreen from "./HackingScreen"
import LoadingScreen from "./LoadingScreen"
import ErrorScreen from "./ErrorScreen"
import TruthScreen from "./TruthScreen"
import { wait } from "../../helpers"
import StartScreen from "./StartScreen"

const Animation = () => {

  const [startScreen, setStartScreen] = useState(false)
  const [loadingScreen, setLoadingScreen] = useState(false)
  const [hackingScreen, setHackingScreen] = useState(false)
  const [errorScreen, setErrorScreen] = useState(false)
  const [truthScreen, setTruthScreen] = useState(false)
  const [active, setActive] = useState(null)
  const chars = ['-','+','@','?','^','!','&','#','%','$','<','>','0','1','2','3','4','5','6','7','8','9']
  
  useEffect(() => {
    
    const animate = async () => {

      switch(active) {
        case 'loading':
          setStartScreen(false)
          setLoadingScreen(true)
          await wait(5000)
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

  return (
    <Fragment>
      {startScreen ? <StartScreen setActive={setActive} /> : null}
      {loadingScreen ? <LoadingScreen setActive={setActive}/> : null}
      {hackingScreen ? <HackingScreen setActive={setActive} chars={chars}/> : null}
      {errorScreen ? <ErrorScreen chars={chars} setActive={setActive}/> : null}
      {truthScreen ? <TruthScreen /> : null}
    </Fragment>
  )
}

export default Animation