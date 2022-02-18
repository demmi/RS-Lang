import React, { useContext, useEffect, useState } from 'react'

import CallGame from '@/components/games/callgame/CallGame'
import getWords from '@/components/api/getWords'
import IsLogged, { Category, Page, SelectedGame } from '@/components/context'
import { CircularProgress } from '@mui/material'
import SprintGame from '@/components/games/SprintGame/SprintGame'

function LoadGame() {
  const { game } = useContext(SelectedGame)
  const { category } = useContext(Category)
  const { isLogged } = useContext(IsLogged)
  const { page } = useContext(Page)
  const [words, setWords] = useState(null)
  const [loaded, setLoaded] = useState(false)

  const loadData = async () => {
    const data = await getWords(category, page)
    await setWords(data)
    setLoaded(true)
  }

  useEffect(() => {
    loadData()
  }, [isLogged, category, page])

  if (game === 'Call') {
    return loaded ? <CallGame words={words} /> : <CircularProgress />
  }
  if (game === 'Sprint') {
    return loaded ? <SprintGame words={words} /> : <CircularProgress />
  }
  return <div />
}

export default LoadGame
