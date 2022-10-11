import React, { useEffect, useRef } from "react"

const Scanner = ({ display }) => {

  const scannerRef = useRef()
  const scanlineTopRef = useRef()
  const scanlineBottomRef = useRef()
  const scanlineLeftRef = useRef()
  const scanlineRightRef = useRef()

  useEffect(() => {
    scannerRef.current.style.display = display
    let n = 0
    const scanMovement = setInterval(() => {
      scanlineTopRef.current.style.top = `${n}%`
      scanlineBottomRef.current.style.bottom = `${n}%`
      scanlineLeftRef.current.style.left = `${n}%`
      scanlineRightRef.current.style.right = `${n}%`
      n = (n + 1) % 100
    }, 5)

    return () => {
      clearInterval(scanMovement)
    }
  }, [display])

  return (
    <div ref={scannerRef} className="scanner">
      <div ref={scanlineTopRef} className="scanline"></div>
      <div ref={scanlineBottomRef} className="scanline"></div>
      <div ref={scanlineLeftRef} className="scanline-vertical"></div>
      <div ref={scanlineRightRef} className="scanline-vertical"></div>
    </div>
  )
}

export default Scanner