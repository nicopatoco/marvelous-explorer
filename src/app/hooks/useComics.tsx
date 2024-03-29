import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getComics } from '../state/comicSlice'
import { AppDispatch, RootState } from '../state/store'

const useComics = (characterId: string | undefined) => {
  const { characterComics, comics, loading, error } = useSelector((state: RootState) => state.comics)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (characterId) {
      dispatch(getComics(characterId))
    }
  }, [dispatch, characterId])

  return { characterComics, comics, loading, error }
}

export default useComics
