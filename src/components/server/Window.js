import React from "react"

const Window = ({ content, setActiveWindow }) => {
  return (
    <div className="window-container">
      <div className="window">
        <div className="bar">
          <h3>{content.title}</h3>
          <button onClick={() => setActiveWindow(null)}>&times;</button>
        </div>
        <div className="content">
          {content.image ? <img src={content.image} alt={content.alt} /> : null}
          {content.component ? content.component : null}
          {content.description ? <p>{content.description}</p> : null}
        </div>
      </div>
    </div>
  )
}

export default Window