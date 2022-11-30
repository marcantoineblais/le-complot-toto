import React, { useEffect, useState } from "react"
import Window from "./Window"

const Folder = ({ folderName }) => {

  const [images, setImages] = useState([])
  const [thumbnails, setThumbnails] = useState([])
  const [imgWindow, setImgWindow] = useState(null)

  useEffect(() => {
    const renderedContent = async () => {
      const res = await fetch('https://nyc3.digitaloceanspaces.com/marc-cloud-storage')
      const text = await res.text()
      const parser = new DOMParser()
      const doc = await parser.parseFromString(text, 'application/xml')
      const urlList = doc.getElementsByTagName('Contents')
      
      const imgList = []
      const thumbList = []
      for (let i = 0; i < urlList.length; i++) {
        const image = urlList[i]
        const url = image.getElementsByTagName('Key')[0].innerHTML
        const regex = new RegExp(`.*/${folderName}/.+`)
        if (url.match(regex)) {
          imgList.push(url)
          thumbList.push(url.replace(folderName, 'thumbnails'))
        }
      }

      setImages(imgList)
      setThumbnails(thumbList)
    }

    renderedContent()
  }, [folderName])

  const openImage = (content) => {
    setImgWindow(<Window content={content} setActiveWindow={setImgWindow} />)
  }

  const renderedImg = () => {
    return thumbnails.map((thumb, i) => {
      const url = 'https://marc-cloud-storage.nyc3.digitaloceanspaces.com/'
      const content = {
        title: thumb.split('/')[thumb.split('/').length - 1],
        image: url + images[i]
      }
      return (
        <div
          className="icon"
          onDoubleClick={() => openImage(content)}
          key={thumb}
        >
          <img src={url + thumb} alt="thumbnail" />
          <p>{content.title}</p>
        </div>
      )
    })
  }

  return (
    <div className="folder">
      {imgWindow}
      {renderedImg()}
    </div>
  )
}

export default Folder