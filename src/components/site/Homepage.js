import React, { useEffect, useRef, useState } from "react"
import { wait } from "../../helpers"

const Homepage = () => {
  
  const [colorIndex, setColorIndex] = useState(0)
  const homepageRef = useRef()
  
  useEffect(() => {
    const borderColors = ['yellow', 'red', 'green']
    const colors = {
      red: 'rgb(150, 0, 0)',
      yellow: 'rgb(255, 243, 80)',
      green: 'rgb(0, 199, 0)'
    }

    const animate = async () => {
      homepageRef.current.style.border = `10px solid ${colors[borderColors[colorIndex]]}`
      await wait(1000)
      setColorIndex((colorIndex + 1) % borderColors.length)
    }

    animate()

  }, [colorIndex])
    
  return (
    <div ref={homepageRef} className="homepage">
      <h1>BIENTOT DISPONIBLE</h1>
    </div>
  )
}

export default Homepage