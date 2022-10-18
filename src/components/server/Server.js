import React, { useEffect, useRef, useState } from "react"

const Server = () => {

  const spaceContent = [
    { image: 'url', alt: 'description', title: 'Premier clones', description: 'description' },
    { image: 'url', alt: 'description', title: 'Test animaux', description: 'description' },
    { image: 'url', alt: 'description', title: 'title', description: 'description' },
    { image: 'url', alt: 'description', title: 'title', description: 'description' },
    { image: 'url', alt: 'description', title: 'title', description: 'description' },
    { image: 'url', alt: 'description', title: 'title', description: 'description' },
    { image: 'url', alt: 'description', title: 'title', description: 'description' },
  ]
  const [numOfCells, setNumOfCells] = useState(0)
  const [cellNumber, setCellNumber] = useState(null)
  const [cellHTML, setCellHTML] = useState(null)

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

  const selectCell = (e, content) => {
    if (content) {
      const order = e.currentTarget.style.order || e.target.style.order
      setCellNumber(order)
      setCellHTML(e.target.outerHTML)
    }
  }

  const moveCell = (e) => {
    const touchLocation = e.changedTouches ? e.changedTouches[0] : { clientX: e.clientX, clientY: e.clientY }
    const element = document.elementFromPoint(touchLocation.clientX, touchLocation.clientY)
    if (cellNumber !== null && !element.innerHTML) {
      const elements = Array.prototype.slice.call(desktopRef.current.children)
      const order = element.style.order
      const movingCell = elements.filter(el => el.style.order === cellNumber).pop()
      const targetCell = elements.filter(el => el.style.order === order).pop()
      targetCell.style.order = cellNumber
      movingCell.style.order = order
    }
    setCellNumber(null)
  }

  const renderedSpace = () => {
    const spaceArray = []
    for (let n = 0; n < numOfCells; n++) {
      const content = spaceContent[n]
      spaceArray.push(
        <div
          className="space"
          id={n}
          key={n}
          style={{ order: n }}
          content={spaceContent[n]}
          onMouseDown={(e) => selectCell(e, content)}
          onTouchStart={(e) => selectCell(e, content)}
          onMouseUp={(e) => moveCell(e, content)}
          onTouchEnd={(e) => moveCell(e, content)}
        >
          {
            content ?
              <div className="icon">
                <img
                  src="https://nyc3.digitaloceanspaces.com/marc-cloud-storage/Shared/le-complot-toto/icons/folder-icon.svg"
                  alt="folder icon"
                /> 
                <p>{content.title}</p>
              </div>
            : null
          }

        </div>)
    }
    return spaceArray
  } 

  return (
    <div className="server">
      <div className="container">
        <div ref={desktopRef} className="desktop">
          {renderedSpace()}
        </div>
      </div>
    </div>
  )
}

export default Server