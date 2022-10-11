import React, { useEffect, useRef, useState } from "react"
import Age from "./info-toto/Age"
import Name from "./info-toto/Name"
import Relatives from "./info-toto/Relatives"
 

const InfoToto = () => {

  const [showName, setShowName] = useState(false)
  const [showAge, setShowAge] = useState(false)
  const [showRelatives, setShowRelatives] = useState(false)

  const chars = ['-','+','@','?','^','!','&','#','%','$','<','>','0','1','2','3','4','5','6','7','8','9']
  const infoRef = useRef()

  useEffect(() => {
    const writeText = setTimeout(() => {
      infoRef.current.style.display = "flex"
      setShowName(true)
      setTimeout(() => {
        setShowName(false)
        setShowAge(true)
        setTimeout(() => {
          setShowAge(false)
          setShowRelatives(true)
        },5000)
      }, 4200)
    }, 2000)

    return () => {
      clearTimeout(writeText)
    }
  }, [])

  return (
    <div ref={infoRef} className="info-toto">
      <div className="top-span">{'<span>'}</div>
      <div className="text">
        {showName ? <Name chars={chars} /> : null}
        {showAge ? <Age chars={chars} /> : null}
        {showRelatives ? <Relatives chars={chars} /> : null}
      </div>
      <div className="bottom-span">{'<span>'}</div>
    </div>
  )
}

export default InfoToto