import React, { useContext, useEffect, useState } from 'react'

import './GamesPage.css'
import CallGame from '@/components/games/callgame/CallGame'
import getWords from '@/components/api/getWords'
import IsLogged, { Category, Page } from '@/components/context'
import { CircularProgress } from '@mui/material'

function GamesPage() {
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

  return loaded ? <CallGame words={words} /> : <CircularProgress />
}

export default GamesPage
