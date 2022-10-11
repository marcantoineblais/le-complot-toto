import React, { useEffect, useState } from "react"
import LoadingScreen from "./LoadingScreen"

const Animation = () => {

  const [loadingScreen, setLoadingScreen] = useState(true)
  const [hackingScreen, setHackingScreen] = useState(false)

  useEffect(() => {
    
    // Stop Loading Screen
    setTimeout(() => {
      setLoadingScreen(false)
    }, 8000)

    // Start Hacking Screen
    setTimeout(() => {
      setHackingScreen(true)
    }, 5000)
  })

  return (
    <div>
      {loadingScreen ? <LoadingScreen /> : null }
    </div>
  )
}

export default Animation