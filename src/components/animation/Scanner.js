import React, { useEffect, useRef, useState } from "react"
import { wait } from "../../helpers"

const Scanner = () => {

  const [position, setPosition] = useState(0)

  const scannerRef = useRef()
  const scanlineTopRef = useRef()
  const scanlineBottomRef = useRef()
  const scanlineLeftRef = useRef()
  const scanlineRightRef = useRef()

  useEffect(() => {

    const animate = async () => {
      scanlineTopRef.current.style.transform = `translateY(${position}%`
      scanlineBottomRef.current.style.transform = `translateY(-${position}%`
      scanlineLeftRef.current.style.transform = `translateX(${position}%`
      scanlineRightRef.current.style.transform = `translateX(-${position}%`
      await wait(500)
      position ? setPosition(0) : setPosition(8000)
    }

    animate()

  }, [position])

  return (
    <div ref={scannerRef} className="scanner">
      <div ref={scanlineTopRef} id="top" className="scanline"></div>
      <div ref={scanlineBottomRef} id="bottom" className="scanline"></div>
      <div ref={scanlineLeftRef} id="left" className="scanline-vertical"></div>
      <div ref={scanlineRightRef} id="right" className="scanline-vertical"></div>
    </div>
  )
}

export default Scanner