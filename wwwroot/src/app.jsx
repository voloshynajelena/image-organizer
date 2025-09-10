import React from 'react'
import { createRoot } from 'react-dom/client'
import ImagesList from './components/images-list'
import Filters from './components/filters'
import 'bootstrap/dist/css/bootstrap.css'


document.onreadystatechange = () => {
  if (document.readyState !== 'loading') {
    initApplication()
  }
}

const initApplication = () => {
  const rootContainer = document.querySelector('.container')
  const root = createRoot(rootContainer)
  root.render(
    <>
      <Filters />
      <ImagesList />
    </>
  )
}
