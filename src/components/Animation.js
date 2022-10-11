import React, { Fragment, useEffect, useState } from "react"
import HackingScreen from "./HackingScreen"
import LoadingScreen from "./LoadingScreen"
import ErrorScreen from "./ErrorScreen"

const Animation = () => {

  const [loadingScreen, setLoadingScreen] = useState(true)
  const [hackingScreen, setHackingScreen] = useState(false)
  const [errorScreen, setErrorScreen] = useState(false)
  const [hackingScreenDone, setHackingScreenDone] = useState(false)

  useEffect(() => {
    
    if (hackingScreenDone) {
      // Start Error Screen
      setHackingScreen(false)
      setErrorScreen(true)
    } else {
      // Stop Loading Screen
      setTimeout(() => {
        setLoadingScreen(false)
      }, 8000)

      // Start Hacking Screen
      setTimeout(() => {
        setHackingScreen(true)
      }, 5000)
    }
    
  }, [hackingScreenDone])

  const done = () => setHackingScreenDone(true)

  return (
    <Fragment>
      {loadingScreen ? <LoadingScreen /> : null}
      {hackingScreen ? <HackingScreen done={done}/> : null}
      {errorScreen ? <ErrorScreen /> : null}
    </Fragment>
  )
}

export default Animation