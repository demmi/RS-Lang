import React, { useContext, useEffect, useState } from 'react'

import './GamesPage.css'
import CallGame from '@/components/games/callgame/CallGame'
import getWords from '@/components/api/getWords'
import getAllUserWords from '@/components/api/getAllUserWords'
import getAllUserAggWords from '@/components/api/getAllUserAggWords'
import IsLogged, { Category, Page, PaginationCount } from '@/components/context'
import { CircularProgress } from '@mui/material'

function GamesPage() {
  const { category } = useContext(Category)
  const { isLogged } = useContext(IsLogged)
  const { page } = useContext(Page)
  const [words, setWords] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const { paginationCount, setPaginationCount } = useContext(PaginationCount)

  const loadData = async () => {
    const data = await getWords(category - 1, page - 1)
    setWords(await data)
    setLoaded(true)
    console.log('show data', await data, loaded)
  }

  useEffect(() => {
    loadData()
  }, [isLogged, category, page])

  return loaded ? <CallGame words={words} /> : <CircularProgress />
}

export default GamesPage
