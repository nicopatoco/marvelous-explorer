import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../state/store'
import { getCharacters } from '../state/charactersSlice'

const useCharacters = () => {
  const { characters, loading, error } = useSelector((state: RootState) => state.characters)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getCharacters())
  }, [dispatch])

  return { characters, loading, error }
}

export default useCharacters
