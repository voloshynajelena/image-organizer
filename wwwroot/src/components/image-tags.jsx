
const ImageTags = ({ allTags, tags }) => {
  console.log(allTags)
  return (
    <>
      { allTags?.length &&
        <div className="image-tags w-100">
          {tags.map((id) => {
            const tag = allTags.find((obj) => obj.id === id);
            if (!tag) {
              console.log('failed to find ' + id)
            }
            return (
              <>
                { tag &&
                  <button type="button" className="me-2 mt-2 btn btn-primary">
                    { tag.name }
                  </button>
                }
              </>
            )
          })}
        </div>
      }
    </>
  )
}

export default ImageTags
