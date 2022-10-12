import { wait } from "@testing-library/user-event/dist/utils"
import React, { useEffect, useRef, useState } from "react"

const LoadingScreen = ({ setActive }) => {

  const [activeDot, setActiveDot] = useState(0)
  const [isActive, setIsActive] = useState(true)

  const contentRef = useRef()
  const dot1 = useRef()
  const dot2 = useRef()
  const dot3 = useRef()
  
  
  useEffect(() => {
    
    const dots = [dot1, dot2, dot3]
    const animate = async () => {
      if (isActive && activeDot < dots.length) {
        await wait(200)
        dots[activeDot].current.classList.toggle('blink')
        setActiveDot(activeDot + 1)
      } else if (activeDot === dots.length) {
        await wait(300)
        setActiveDot(0)
      }
    }

    animate()

  }, [activeDot, isActive])

  useEffect(() => {

    const terminate = async() => {
      await wait(4000)
      contentRef.current.classList.add('blink')
      await wait(1000)
      setIsActive(false)
      await wait(200)
      setActive('hacking')
    }

    terminate()
    
  }, [setActive])



  return (
    <div className="loading-screen">
      <div className="black-bg">
        <div className="content" ref={contentRef}>
          <h1>LOADING</h1>
          <div className="dots">
            <div className="white-dot" ref={dot1}></div>
            <div className="white-dot" ref={dot2}></div>
            <div className="white-dot" ref={dot3}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen