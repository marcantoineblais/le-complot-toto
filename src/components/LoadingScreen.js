import React, { useEffect, useRef } from "react"

const LoadingScreen = () => {

  const contentRef = useRef()
  const dot1 = useRef()
  const dot2 = useRef()
  const dot3 = useRef()
  const dots = [dot1, dot2, dot3]

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < dots.length) {
        dots[i].current.classList.toggle('blink')
      }
      i = (i + 1) % (dots.length + 1)
    }, 200)

    const fadeOut = setTimeout(() => {
      contentRef.current.classList.add('blink')
    }, 4000)

    return () => {
      clearInterval(timer)
      clearTimeout(fadeOut)
    }
  })

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