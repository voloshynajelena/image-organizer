import { useEffect, useMemo, useState } from 'react'
import { useFiltersStore } from '../filters-store'

const normalizeRange = (min, max) => {
  const minValue = min === '' || min == null ? undefined : Number(min)
  const maxValue = max === '' || max == null ? undefined : Number(max)
  if (minValue != null && maxValue != null && minValue > maxValue)
    return { min: maxValue, max: minValue }
  return { min: minValue, max: maxValue }
}

const matchTags = (img, active) => !active?.length || active.every((t) => img.tags.includes(t))

const matchSize = (img, min, max) => {
  const { min: minValue, max: maxValue } = normalizeRange(min, max)
  const size = img.file?.['size (MB)']
  if (minValue != null && size < minValue) return false
  if (maxValue != null && size > maxValue) return false
  return true
}

const matchDims = (img, wMin, wMax, hMin, hMax) => {
  const widthRange = normalizeRange(wMin, wMax)
  const heightRange = normalizeRange(hMin, hMax)
  const { width, height } = img.dimensions || {}
  if (widthRange.min != null && width < widthRange.min) return false
  if (widthRange.max != null && width > widthRange.max) return false
  if (heightRange.min != null && height < heightRange.min) return false
  if (heightRange.max != null && height > heightRange.max) return false
  return true
}

export default function useImagesList() {
  const [images, setImages] = useState([])
  const [tags, setTags] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const { state: filters } = useFiltersStore()

  useEffect(() => {
    fetch('/data/images.json', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then((data) =>
        Array.isArray(data) && data.length ? setImages(data) : setErrorMessage('No images found')
      )
      .catch(() => setErrorMessage('Failed to load images'))

    fetch('/data/tags.json', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then((data) =>
        Array.isArray(data) && data.length
          ? setTags(data)
          : setErrorMessage((p) => p || 'No tags found')
      )
      .catch(() => setErrorMessage((p) => p || 'Failed to load tags'))
  }, [])

  const filteredList = useMemo(() => {
    return images.filter(
      (img) =>
        matchTags(img, filters.tags) &&
        matchSize(img, filters.sizeMin, filters.sizeMax) &&
        matchDims(img, filters.wMin, filters.wMax, filters.hMin, filters.hMax)
    )
  }, [images, filters])

  return {
    tags,
    errorMessage,
    filteredList,
  }
}
