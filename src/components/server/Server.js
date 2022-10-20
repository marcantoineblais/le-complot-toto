import React, { useEffect, useRef, useState } from "react"
import parse from 'html-react-parser'
import Window from "./Window"
import { Link } from "react-router-dom"
import raw from './code.txt'

const Server = () => {

  const spaceContent = [
    {
      image: 'https://nyc3.digitaloceanspaces.com/marc-cloud-storage/Shared/le-complot-toto/images/3-clones.jpeg',
      alt: '3 clones, age de 8ans',
      title: 'Plus que deux',
      description: "Nous estimons qu'un total de 49 clones ont été produit depuis le début du projet. La preuve ici qu'ils sont plus que deux."
    },
    {
      image: 'https://nyc3.digitaloceanspaces.com/marc-cloud-storage/Shared/le-complot-toto/images/membres-contraries.jpeg',
      alt: '2 membres du conseil mécontent du projet',
      title: 'Membres contrariés',
      description: "Plusieurs membres du projet TOTO ont été troublé par les résultats de l'expérience. Nous voyons ici deux jeunes hommes qui regrettent leur implication dans le projet."
    },
    {
      image: 'https://nyc3.digitaloceanspaces.com/marc-cloud-storage/Shared/le-complot-toto/images/toto-et-maxou.jpg',
      alt: 'toto et maxou bébé',
      title: 'TOTO et MAXOU',
      description: "TOTO et MAXOU qui sont en parfaite santé. Un vent d'espoir pour le futur du projet."
    },
    {
      image: 'https://nyc3.digitaloceanspaces.com/marc-cloud-storage/Shared/le-complot-toto/images/test-animaux.jpg',
      alt: 'POUPOUNE et les test primaires',
      title: 'Nom de code: WOOF',
      description: "POUPOUNE et les deux premiers clones canins survivant à la procédure. Tout semble indiquer qu'ils sont en parfaite santé."
    },
    {
      image: 'https://nyc3.digitaloceanspaces.com/marc-cloud-storage/Shared/le-complot-toto/images/message-secret.jpg',
      alt: 'texte illisible écrit par un enfant',
      title: 'Message secret',
      description: "Message secret d'un des clones qui a réussi à s'enfuire du laboratoire #2 durant son adolescence. Ne nous savons toujours pas à ce jour ce que signifie le message."
    },
    {
      image: 'https://nyc3.digitaloceanspaces.com/marc-cloud-storage/Shared/le-complot-toto/images/piece-de-rechange.jpg',
      alt: '3 enfants et 2 parents',
      title: 'Pièces de rechange',
      description: "POUPOUNE et GROSPÈRE avec 3 clones créés dans le but de fournir des organes et tissus si jamais le sujet original venait à être âbimé. Plusieurs membres du projet questionnent le côté éthique de cette procédure."
    },
  ]

  const unauthorizedAccess = {
    image: 'https://nyc3.digitaloceanspaces.com/marc-cloud-storage/Shared/le-complot-toto/icons/acces-interdit.webp',
    alt: 'pancarte acces interdit',
    title: 'Unauthorised access',
    description: 'Unauthorised access: PERMISSION DENIED'
  }

  const inception = {
    title: 'Inception',
    component: <iframe src="https://le-complot-toto.wiki" title="Inception" style={{ height: '80vh', width: '100%' }} />
  }

  const browser = {
    title: 'Internet explorer',
    component: <iframe src="https://bing.com" title="bing" style={{ height: '80vh', width: '100%' }} />
  }
  
  const [code, setCode] = useState({})
  const [numOfCells, setNumOfCells] = useState(0)
  const [sourceOrder, setSourceOrder] = useState(null)
  const [cellHTML, setCellHTML] = useState(null)
  const [activePosition, setActivePosition] = useState(null)
  const [positionOffset, setPositionOffset] = useState(null)
  const [activeWindow, setActiveWindow] = useState(null)
  const [activeElement, setActiveElement] = useState(null)
  const [startMenuActive, setStartMenuActive] = useState(false)
  const [time, setTime] = useState(null)
  const [date, setDate] = useState(null)

  const desktopRef = useRef()

  useEffect(() => {
    
    const desktop = desktopRef.current
    const width = Math.floor(desktop.clientWidth / 80)
    const height = Math.floor(desktop.clientHeight / 80)
    setNumOfCells(width * height)

    window.addEventListener('resize', () => {
      const width = Math.floor(desktop.clientWidth / 80)
      const height = Math.floor(desktop.clientHeight / 80)
      setNumOfCells(width * height)
    })
    
    return () => {
      const width = Math.floor(desktop.clientWidth / 80)
      const height = Math.floor(desktop.clientHeight / 80)
      setNumOfCells(width * height)
    }
  }, [])

  useEffect(() => {
    const reader = async () => {
      const file = await fetch(raw)
      const text = await file.text()
      setCode({
        image: null,
        alt: null,
        title: 'Code Source',
        description: text
      })
    }

    reader()

    const dateObj = new Date().toString().split(' ')
    setDate(dateObj.slice(1, 4).join(' '))
    setTime(dateObj[4].slice(0, 5))
    
    const timeTimer = setInterval(() => {
      const dateObj = new Date().toString().split(' ')
      setDate(dateObj.slice(1, 4).join(' '))
      setTime(dateObj[4].slice(0, 5))
    }, 1000)

    return () => {
      clearTimeout(timeTimer)
    }
  }, [])

  const highlightCell = (e, content) => {
    if (content) {
      const element = e.currentTarget || e.target
      setSourceOrder(null)
      setCellHTML(null)
      setPositionOffset(null)
      if (activeElement) {
        activeElement.classList.remove('highlight')
      }
      element.classList.add('highlight')
      setActiveElement(element)
    } else if (activeElement) {
      activeElement.classList.remove('highlight')
      setActiveElement(null)
    }
  }

  const selectCell = (e, content) => {
    if (content) {
      const element = e.currentTarget || e.target
      const order = parseInt(element.style.order)
      const cellCoord = element.getBoundingClientRect()
      const desktopCoord = desktopRef.current.getBoundingClientRect()
      const eventCoord = e.changedTouches ? e.changedTouches[0] : { clientX: e.clientX, clientY: e.clientY }
      setSourceOrder(order)
      setCellHTML(e.currentTarget.innerHTML || e.target.innerHTML)
      setPositionOffset({ top: eventCoord.clientY - cellCoord.top + desktopCoord.top, left: eventCoord.clientX - cellCoord.left + desktopCoord.left })
    }
  }

  const dragCell = (e) => {
    if (sourceOrder === null) {
      return
    }

    if (activeElement) {
      activeElement.classList.remove('highlight')
      setActiveElement(null)
    }
    
    const eventCoord = e.changedTouches ? e.changedTouches[0] : { clientX: e.clientX, clientY: e.clientY }
    setActivePosition(eventCoord)
  }

  const moveCell = () => {
    if (activePosition === null) {
      return
    }
    
    if (sourceOrder !== null) {  
      const elements = Array.prototype.slice.call(desktopRef.current.children)
      const targetCell = elements.filter((el) => {
        const coord = el.getBoundingClientRect()
        return (
          coord.left <= activePosition.clientX && coord.right > activePosition.clientX &&
          coord.top <= activePosition.clientY && coord.bottom > activePosition.clientY &&
          !el.classList.contains('active')
        )
      }).pop()

      if (!targetCell) {
        return
      }

      const targetOrder = parseInt(targetCell.style.order)
      const sourceCell = elements.filter(el => parseInt(el.style.order) === sourceOrder).pop()
      if (!targetCell.innerHTML) {
        targetCell.style.order = sourceOrder
      } else if (sourceCell !== targetCell) {
        const spaceBetweenTargets = elements.filter((el) => {
          const order = parseInt(el.style.order)
          return (
            (order <= targetOrder && order > sourceOrder) ||
            (order < sourceOrder && order >= targetOrder)
          )
        }).sort((el1, el2) => {
          const a = parseInt(el1.style.order)
          const b = parseInt(el2.style.order)
          return a - b
        })
        
        let run = true
        if (targetOrder > sourceOrder) {
          spaceBetweenTargets.reverse().forEach((el) => {
            if (run) {
              const order = parseInt(el.style.order)
              if (el.innerHTML) {
                el.style.order = order - 1
              } else {
                el.style.order = sourceOrder
                run = false
              }
            }
          })
        } else if (targetOrder < sourceOrder) {
          spaceBetweenTargets.forEach((el) => {
            if (run) {
              const order = parseInt(el.style.order)
              if (el.innerHTML) {
                el.style.order = order + 1
              } else {
                el.style.order = sourceOrder
                run = false
              }
            } 
          })
        }
      }
      sourceCell.style.order = targetOrder
    }
    setSourceOrder(null)
    setCellHTML(null)
    setActivePosition(null)
    setPositionOffset(null)
  }

  const resetDrag = () => {
    setSourceOrder(null)
    setCellHTML(null)
    setActivePosition(null)
    setPositionOffset(null)
  }

  const openWindow = (content) => {
    setSourceOrder(null)
    setCellHTML(null)
    setActivePosition(null)
    setActiveWindow(content)
  }

  const renderedSpace = () => {
    const spaceArray = []
    for (let n = 0; n < numOfCells; n++) {
      const content = spaceContent[n] || null
      spaceArray.push(
        <div
          className="space"
          id={n}
          key={n}
          style={{ order: n }}
          content={spaceContent[n]}
          onClick={(e) => highlightCell(e, content)}
          onMouseDown={(e) => selectCell(e, content)}
          onTouchStart={(e) => selectCell(e, content)}
          onMouseUp={() => moveCell()}
          onTouchEnd={() => moveCell()}
          onMouseMove={(e) => dragCell(e)}
          onTouchMove={(e) => dragCell(e)}
          onDoubleClick={() => openWindow(content)}
        >
          {content ? ( 
            <div className="icon">
              <img
                src="https://nyc3.digitaloceanspaces.com/marc-cloud-storage/Shared/le-complot-toto/icons/folder-icon.svg"
                alt="folder icon"
              /> 
              <p>{content.title}</p>
            </div>
          ) : null}

        </div>)
    }
    return spaceArray
  }
  
  const renderedDraggedIcon = () => {
    if (activePosition === null) {
      return null
    }
    const top = activePosition.clientY - positionOffset.top
    const left = activePosition.clientX - positionOffset.left
    return (
      <div
        className="icon active"
        style={{ top: top, left: left }}
        onMouseMove={(e) => dragCell(e)}
        onTouchMove={(e) => dragCell(e)}
        onMouseUp={() => moveCell()}
        onTouchEnd={() => moveCell()}
      >
        {parse(cellHTML)}
      </div>
    )
  }

  return (
    <div
      className="server"
      onMouseUp={() => resetDrag()}
      onTouchEnd={() => resetDrag()}
    >
      <div className="container">
        <div ref={desktopRef} className="desktop" onClick={() => setStartMenuActive(false)}>
          {activeWindow ? <Window content={activeWindow} setActiveWindow={setActiveWindow} /> : null}
          {renderedSpace()}
          {cellHTML ? renderedDraggedIcon() : null}
        </div>
        <div className="taskbar">
          <div className="start-menu">
            <button onClick={() => setStartMenuActive(!startMenuActive)}>Start</button>
            <div className="menu" style={{ display: startMenuActive ? 'flex' : 'none' }}>
              <div className="app-menu" onClick={() => setStartMenuActive(false)}>
                <button onClick={() => setActiveWindow(browser)}>Internet Explorer</button>
                <button onClick={() => setActiveWindow(unauthorizedAccess)}>Documents</button>
                <a href="https://cssgames.herokuapp.com/games/1" target="_blank" rel="noreferrer">Games</a>
                <button onClick={() => setActiveWindow(unauthorizedAccess)}>Applications</button>
                <Link to="/">Replay intro</Link>
                <button onClick={() => setActiveWindow(code)}>Code Source</button>
                <button onClick={() => setActiveWindow(inception)}>Inception</button>
              </div>
              <Link to="/truth">Logout</Link>
            </div>
          </div>
          <div className="clock">
            <h3>{time}</h3>
            <h3>{date}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Server