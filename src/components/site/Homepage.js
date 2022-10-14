import React, { useEffect, useRef, useState } from "react"
import { wait } from "../../helpers"

const Homepage = () => {
  
  const [colorIndex, setColorIndex] = useState(0)
  const [blurImage, setBlurImage] = useState(true)
  const homepageRef = useRef()
  const confidentialRef = useRef()
  const h1Ref = useRef()
  const totoFolderRef = useRef()
  const maxFolderRef = useRef()
  const blurRef = useRef()

  const unBlur = () => {
    setBlurImage(false)
    totoFolderRef.current.classList.remove('zoom-in')
    maxFolderRef.current.classList.remove('zoom-in')
  }
  
  useEffect(() => {
    const borderColors = ['red', 'orange', 'yellow', 'green', 'blue', 'white']
    const colors = {
      red: 'rgb(150, 0, 0)',
      orange: 'rgb(204, 109, 0)',
      yellow: 'rgb(255, 243, 80)',
      green: 'rgb(0, 199, 0)',
      blue: 'rgb(0, 72, 131)',
      white: 'rgb(235, 235, 235)'
    }

    const animate = async () => {
      homepageRef.current.style.border = `10px solid ${colors[borderColors[colorIndex]]}`
      homepageRef.current.style.color = colors[borderColors[colorIndex]]
      confidentialRef.current.style.borderBottom = `5px solid ${colors[borderColors[colorIndex]]}`
      confidentialRef.current.style.color = colors[borderColors[colorIndex]]
      h1Ref.current.style.borderBottom = `5px solid ${colors[borderColors[colorIndex]]}`
      await wait(1000)
      setColorIndex((colorIndex + 1) % borderColors.length)
    }

    if (blurImage) {
      animate()
    } else {
      homepageRef.current.classList.remove('border-padding')
      homepageRef.current.style.border = 'none'
      homepageRef.current.style.color = colors['red']
      confidentialRef.current.style.color = colors['red']
      confidentialRef.current.style.borderBottom = `5px solid ${colors['red']}`
      h1Ref.current.style.borderBottom = `5px solid ${colors['red']}`
    }
    
  }, [colorIndex, blurImage])
  
  useEffect(() => {

    blurRef.current.style.top = `${confidentialRef.current.clientHeight + 15}px`

    window.addEventListener('load', () => {
      blurRef.current.style.top = `${confidentialRef.current.clientHeight + 15}px`
    })
    
    window.addEventListener('resize', () => {
      blurRef.current.style.top = `${confidentialRef.current.clientHeight + 15}px`
    })

    const blur = blurRef.current
    const confidential = confidentialRef.current
    
    return () => {      
      window.removeEventListener('load', () => {
        blur.style.top = `${confidential.clientHeight + 15}px`
      })

      window.removeEventListener('resize', () => {
        blur.style.top = `${confidential.clientHeight + 15}px`
      })
    }
  }, [])
    
  return (
    <div ref={homepageRef} className="homepage border-padding">
      <div ref={confidentialRef}>
        <h1 ref={h1Ref}>CONFIDENTIEL</h1>
        <h3>
          Les dossiers ci-dessous sont strictement confidentiels.
          Toute personne partageant son contenu sera passible d'une sentence de haute trahison.
        </h3>
        <h2>Poursuivez à vos risques.</h2>
      </div>
      <div className="dossier">
        <img
          ref={totoFolderRef}
          className="zoom-in"
          src="https://nyc3.digitaloceanspaces.com/marc-cloud-storage/Shared/le-complot-toto/images/dossier-toto.png"
          alt="dossier figurant des informations sur Toto"
        />
        <img
          ref={maxFolderRef}
          className="zoom-in"
          src="https://nyc3.digitaloceanspaces.com/marc-cloud-storage/Shared/le-complot-toto/images/dossier-max.png"
          alt="dossier figurant des informations sur Toto"
        />
        {blurImage ? <img
          onClick={() => unBlur()}
          className="eye"
          src="https://nyc3.digitaloceanspaces.com/marc-cloud-storage/Shared/le-complot-toto/images/eye.png"
          alt="Eye icon"
          /> : null }
        {blurImage ? <div ref={blurRef} className="blur"></div> : null}
      </div>
    </div>
  )
}

export default Homepage