import React, { Fragment, useEffect, useState } from "react"
import HackingScreen from "./HackingScreen"
import LoadingScreen from "./LoadingScreen"
import ErrorScreen from "./ErrorScreen"
import { wait } from "../helpers"

const Animation = () => {

  const [loadingScreen, setLoadingScreen] = useState(true)
  const [hackingScreen, setHackingScreen] = useState(false)
  const [errorScreen, setErrorScreen] = useState(false)
  const [truthScreen, setTruthScreen] = useState(false)
  const [active, setActive] = useState('loading')
  const chars = ['-','+','@','?','^','!','&','#','%','$','<','>','0','1','2','3','4','5','6','7','8','9']

  
  useEffect(() => {
    
    const animate = async () => {

      switch(active) {
        case 'loading':
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
          setErrorScreen(false)
          setTruthScreen(true)
          break

        default:
          setActive('loading')
      }
    }
      
    animate()
    
  }, [active])

  return (
    <Fragment>
      {loadingScreen ? <LoadingScreen setActive={setActive}/> : null}
      {hackingScreen ? <HackingScreen setActive={setActive} chars={chars}/> : null}
      {errorScreen ? <ErrorScreen chars={chars} setActive={setActive}/> : null}
    </Fragment>
  )
}

export default Animation