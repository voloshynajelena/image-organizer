import { useEffect, useState } from 'react'
import ImageCard from './image-card'


const ImagesList = () => {
  const [images, setImages] = useState([])
  const [tags, setTags] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetch('/data/images.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.length) {
          setImages(data)
        } else {
          setErrorMessage('No images found')
        }
      })
      .catch((err) => {
        setErrorMessage('Failed to load images')
      })

    fetch('/data/tags.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.length) {
          setTags(data)
        } else {
          setErrorMessage('No tags found')
        }
      })
      .catch((err) => {
        setErrorMessage('Failed to load tags')
      })
  }, [])

  return (
    <>
      { errorMessage &&
        <div className="alert alert-danger" role="alert">
          { errorMessage }
        </div>
      }
      <div className="images-list mt-5 w-100 row">
        {images.map((item) => {
          return (
            <ImageCard
              key={`${item.id}-imageCard`}
              allTags={tags}
              image={item}
            />
          )
        })}
      </div>
    </>
  )
}

export default ImagesList
