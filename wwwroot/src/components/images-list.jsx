import ImageCard from './image-card'
import useImagesList from '../hooks/useImagesList'

const ImagesList = () => {
  const { tags, errorMessage, filteredList } = useImagesList()

  return (
    <>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="images-list mt-5 w-100 row">
        {filteredList.map((item) => (
          <ImageCard key={`${item.id}-imageCard`} allTags={tags} image={item} />
        ))}
        {!filteredList.length && !errorMessage && <div className="text-muted">No results</div>}
      </div>
    </>
  )
}

export default ImagesList
