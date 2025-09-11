import { useFiltersStore } from '../filters-store'

const ImageTags = ({ allTags, tags }) => {
  const { addTag } = useFiltersStore()

  return (
    <>
      {allTags?.length && (
        <div className="image-tags w-100">
          {tags.map((id) => {
            const tag = allTags.find((obj) => obj.id === id)
            return tag ? (
              <button
                key={id}
                type="button"
                className="me-2 mt-2 btn btn-primary"
                onClick={() => addTag(id)}>
                {tag.name}
              </button>
            ) : null
          })}
        </div>
      )}
    </>
  )
}

export default ImageTags
