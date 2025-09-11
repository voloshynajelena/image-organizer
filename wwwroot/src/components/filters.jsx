import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useFiltersStore } from '../filters-store'

const Filters = () => {
  const { state: filters, setPatch } = useFiltersStore()
  const [allTags, setAllTags] = useState([])

  useEffect(() => {
    fetch('/data/tags.json')
      .then((r) => r.json())
      .then((d) => (Array.isArray(d) ? setAllTags(d) : setAllTags([])))
      .catch(() => {})
  }, [])

  const num = (e) => (e.target.value === '' ? undefined : Number(e.target.value))

  const tagOptions = allTags.map((t) => ({ value: t.id, label: t.name }))
  const selected = tagOptions.filter((o) => filters.tags.includes(o.value))

  return (
    <div className="filters-container container mt-3">
      <div className="row mb-2 w-100">
        <div className="col-3 text-end">
          <h3>Tags:</h3>
        </div>
        <div className="col-8">
          <Select
            isMulti
            isClearable
            options={tagOptions}
            value={selected}
            onChange={(items) => setPatch({ tags: (items || []).map((i) => i.value) })}
            placeholder="Select tags..."
            classNamePrefix="rs"
          />
        </div>
      </div>

      <div className="row mb-2 w-100">
        <div className="col-3 text-end">
          <h3>File Size:</h3>
        </div>
        <div className="col-8">
          <div className="row">
            <div className="input-group" style={{ maxWidth: '9rem' }}>
              <div className="input-group-prepend">
                <span className="input-group-text">&gt;=</span>
              </div>
              <input
                type="number"
                className="form-control"
                step="0.1"
                value={filters.sizeMin ?? ''}
                onChange={(e) => setPatch({ sizeMin: num(e) })}
              />
            </div>
            <div className="input-group" style={{ maxWidth: '9rem' }}>
              <input
                type="number"
                className="form-control"
                step="0.1"
                value={filters.sizeMax ?? ''}
                onChange={(e) => setPatch({ sizeMax: num(e) })}
              />
              <div className="input-group-append">
                <span className="input-group-text">&lt;=</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row w-100">
        <div className="col-3 text-end">
          <h3>Dimensions:</h3>
        </div>
        <div className="col-8">
          <div className="row">
            <div className="col-auto">
              <div className="row">
                <h5 className="col mb-0 pb-0 mt-2">Width:</h5>
                <div className="input-group" style={{ maxWidth: '10rem' }}>
                  <div className="input-group-prepend">
                    <span className="input-group-text">&gt;=</span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    step="100"
                    value={filters.wMin ?? ''}
                    onChange={(e) => setPatch({ wMin: num(e) })}
                  />
                </div>
                <div className="input-group" style={{ maxWidth: '10rem' }}>
                  <input
                    type="number"
                    className="form-control"
                    step="100"
                    value={filters.wMax ?? ''}
                    onChange={(e) => setPatch({ wMax: num(e) })}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">&lt;=</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-auto">
              <div className="row">
                <h5 className="col mb-0 pb-0 mt-2">Height:</h5>
                <div className="input-group" style={{ maxWidth: '10rem' }}>
                  <div className="input-group-prepend">
                    <span className="input-group-text">&gt;=</span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    step="100"
                    value={filters.hMin ?? ''}
                    onChange={(e) => setPatch({ hMin: num(e) })}
                  />
                </div>
                <div className="input-group" style={{ maxWidth: '10rem' }}>
                  <input
                    type="number"
                    className="form-control"
                    step="100"
                    value={filters.hMax ?? ''}
                    onChange={(e) => setPatch({ hMax: num(e) })}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">&lt;=</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filters
