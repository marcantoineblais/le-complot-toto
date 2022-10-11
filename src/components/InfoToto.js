import React, { useEffect, useRef, useState } from "react"
import Age from "./info-toto/Age"
import Name from "./info-toto/Name"
import Relatives from "./info-toto/Relatives"
 

const InfoToto = ({ done }) => {

  const [showName, setShowName] = useState(false)
  const [showAge, setShowAge] = useState(false)
  const [showRelatives, setShowRelatives] = useState(false)

  const chars = ['-','+','@','?','^','!','&','#','%','$','<','>','0','1','2','3','4','5','6','7','8','9']
  const infoRef = useRef()

  useEffect(() => {
    const writeText = setTimeout(() => {
      infoRef.current.style.display = "flex"
      // START NAME SEQUENCE
      setShowName(true)
      setTimeout(() => {

        //START AGE SEQUENCE
        setShowName(false)
        setShowAge(true)

        //START RELATIVES SEQUENCE
        setTimeout(() => {
          setShowAge(false)
          setShowRelatives(true)
          setTimeout(() => {

            //STOP INFO SEQUENCES
            clearTimeout(writeText)
            done()
          }, 5000)
        }, 5000)
      }, 4500)
    }, 2000)

    return () => {
      clearTimeout(writeText)
    }
  }, [done])

  return (
    <div ref={infoRef} className="info-toto">
      <div className="top-span">{'<span>'}</div>
      <div className="text">
        {showName ? <Name chars={chars} /> : null}
        {showAge ? <Age chars={chars} /> : null}
        {showRelatives ? <Relatives chars={chars} /> : null}
      </div>
      <div className="bottom-span">{'</span>'}</div>
    </div>
  )
}

export default InfoToto