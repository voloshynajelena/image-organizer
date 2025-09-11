import { createContext, useContext, useMemo, useReducer, createElement } from 'react'

const initialState = {
  tags: [],
  sizeMin: undefined,
  sizeMax: undefined,
  wMin: undefined,
  wMax: undefined,
  hMin: undefined,
  hMax: undefined,
}

function reducer(state, action) {
  switch (action.type) {
    case 'patch':
      return { ...state, ...action.payload }
    case 'addTag': {
      const id = action.payload
      return state.tags.includes(id) ? state : { ...state, tags: [...state.tags, id] }
    }
    case 'removeTag': {
      const id = action.payload
      return { ...state, tags: state.tags.filter((t) => t !== id) }
    }
    case 'reset':
      return initialState
    default:
      return state
  }
}

// --- React Context ---
const FiltersContext = createContext(null)

export const FiltersProvider = ({ children, value: injectedInitial = initialState }) => {
  const [state, dispatch] = useReducer(reducer, injectedInitial)

  const api = useMemo(() => {
    const setPatch = (patch) => dispatch({ type: 'patch', payload: patch })
    const addTag = (id) => dispatch({ type: 'addTag', payload: id })
    const removeTag = (id) => dispatch({ type: 'removeTag', payload: id })
    const resetFilters = () => dispatch({ type: 'reset' })

    return { state, setPatch, addTag, removeTag, resetFilters }
  }, [state])

  return createElement(FiltersContext.Provider, { value: api }, children)
}

export const useFiltersStore = () => {
  const ctx = useContext(FiltersContext)
  if (!ctx) {
    throw new Error(
      'useFiltersStore must be used within a <FiltersProvider>. Wrap your app (or the relevant subtree) with <FiltersProvider>.'
    )
  }
  return ctx
}
