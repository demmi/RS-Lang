import React, { useEffect, useState, useRef, useContext } from 'react'

import './TutorialPage.css'
import WordCard from '@/components/pages/TutorialPage/Card/wordCard'
import { Grid, Stack } from '@mui/material'
import getWords from '@/components/api/getWords'
import getAllUserWords from '@/components/api/getAllUserWords'
import createUserWord from '@/components/api/createUserWord'
import IsLogged, { Category, Page } from '@/components/context'
import TutorialPagination from './TutorialPagination/TutorialPagination'
import PageOfCategories from './PageOfCategories/PageOfCategories'

function TutorialPage() {
  const [words, setWords] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [audioSrc, setAudio] = useState(null)
  const { isLogged } = useContext(IsLogged)
  const { category } = useContext(Category)
  const { page } = useContext(Page)

  const audioRef = useRef(new Audio(audioSrc))

  useEffect(() => {
    audioRef.current.pause()
    audioRef.current = new Audio(audioSrc)
    audioRef.current.play()
  }, [audioSrc])

  useEffect(() => {
    const loadData = async () => {
      const data = await getWords(category - 1, page - 1)

      if (isLogged) {
        const userWords = await getAllUserWords(localStorage.demmiUserId, localStorage.demmiUserToken)

        console.log('data:', data)
        console.log('userWords:', userWords)

        const newData = data.map((el) => {
          const element = {...el}
          userWords.forEach((elm) => {
            if (elm.wordId === el.id) {
              element.difficulty = elm.difficulty
            }
          })
          return element
        })

        console.log('newData:', newData);

        setWords(newData)
      } else {
        setWords(data)
      }

      setLoaded(true)
    }
    loadData()
  }, [category, page])

  const setDiffWord = (curWordId) => {
    // console.log('set diff word, word curWordId:', curWordId)
    const setData = async () => {
      /* const setWord = */ await createUserWord({
        userId: localStorage.demmiUserId,
        userToken: localStorage.demmiUserToken,
        wordId: curWordId,
        word: { "difficulty": "hard", "optional": {testFieldString: 'test', testFieldBoolean: true} }
      });
      // console.log(setWord)
    }
    setData()
  }

  return (
    <div className="tutorial-category">
      <Stack spacing={2} sx={{ position: 'fixed', top: 85, left: 8, height: '81%', justifyContent: 'space-between' }}>
        <PageOfCategories />
        <TutorialPagination sx={{ marginTop: '50px' }} />
      </Stack>
      <div className="empty-space"> </div>
      <div className="tutorial-content">
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
          {loaded ? words.map(el => <WordCard data={el} key={el.id} setAudio={setAudio} setDiffWord={setDiffWord} />) : <h3>Loading Data</h3>}
        </Grid>
      </div>
    </div>
  )
}

export default TutorialPage
