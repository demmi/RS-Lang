import React, { useEffect, useState, useRef, useContext } from 'react'

import './TutorialPage.css'
import WordCard from '@/components/pages/TutorialPage/Card/wordCard'
import { CircularProgress, Grid, Stack } from '@mui/material'
import getWords from '@/components/api/getWords'
import getAllUserWords from '@/components/api/getAllUserWords'
import getAllUserAggWords from '@/components/api/getAllUserAggWords'
import IsLogged, { Category, Page, PaginationCount, PageRouter } from '@/components/context'
import { CUR_ROUTER_PAGE, CUR_CATEGORY, CUR_CATEGORY_PAGE, CUR_PAGINATION_COUNT } from '@/components/const'
import TutorialPagination from './TutorialPagination/TutorialPagination'
import PageOfCategories from './PageOfCategories/PageOfCategories'
import HardCard from './Card/HardCard'

function TutorialPage() {
  const [words, setWords] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [audioSrc, setAudio] = useState(null)
  const { isLogged } = useContext(IsLogged)
  const { routerPage } = useContext(PageRouter)
  const { category } = useContext(Category)
  const { page } = useContext(Page)
  const { paginationCount, setPaginationCount } = useContext(PaginationCount)

  const audioRef = useRef(new Audio(audioSrc))

  useEffect(() => {
    audioRef.current.pause()
    audioRef.current = new Audio(audioSrc)
    audioRef.current.play()
  }, [audioSrc])

  useEffect(() => {
    const loadData = async () => {
      const data = await getWords(category - 1, page - 1)

      console.log('its useEfferct from TutorialPage')

      if (isLogged) {
        console.log('its useEfferct isLogged from TutorialPage')
        if (category !== 7) {
          const userWords = await getAllUserWords(localStorage.demmiUserId, localStorage.demmiUserToken)

          const newData = data.map(el => {
            const element = { ...el }
            userWords.forEach(elm => {
              if (elm.wordId === el.id) {
                element.difficulty = elm.difficulty
              }
            })
            return element
          })

          setPaginationCount(30)
          setWords(newData)
        } else {
          const filter = { 'userWord.difficulty': 'hard' }
          const userAggWordsData = await getAllUserAggWords(
            localStorage.demmiUserId,
            localStorage.demmiUserToken,
            page - 1,
            filter
          )
          const aggWords = userAggWordsData[0].paginatedResults
          const aggWordsCount = userAggWordsData[0].totalCount[0].count
          const numPage = Math.floor(aggWordsCount / 20) + 1

          setPaginationCount(numPage)
          setWords(aggWords)
          // sessionStorage.setItem(CUR_PAGINATION_COUNT, paginationCount);

          console.log('this is seven category')
          console.log('aggWords:', userAggWordsData, 'aggWordsCount:', aggWordsCount, 'numPage:', numPage)
        }
      } else {
        setWords(data)
      }

      setLoaded(true)
    }
    loadData()
  }, [isLogged, category, page])

  // const choiceCard = () => {
  //   category !== 7
  //     ? (<>{words.map(el => <WordCard data={el} key={el.id} setAudio={setAudio} />)}</>)
  //     : (<>{words.map(el => <HardCard data={el} key={el.id} setAudio={setAudio} />)}</>)
  // }

  sessionStorage.setItem(CUR_ROUTER_PAGE, routerPage)
  sessionStorage.setItem(CUR_CATEGORY, category)
  sessionStorage.setItem(CUR_CATEGORY_PAGE, page)
  sessionStorage.setItem(CUR_PAGINATION_COUNT, paginationCount)

  return (
    <div className="tutorial-category">
      <Stack
        spacing={2}
        sx={{
          position: 'fixed',
          top: 85,
          left: 8,
          height: '81%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <PageOfCategories />
        <div>
          <TutorialPagination sx={{ marginTop: '50px' }} />
          <div className="empty-line"> </div>
        </div>
      </Stack>
      <div className="empty-space"> </div>
      <div className="tutorial-content">
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
          {loaded ? (
            category !== 7 ? (
              words.map(el => <WordCard data={el} key={el.id} setAudio={setAudio} />)
            ) : (
              words.map(el => <HardCard data={el} key={el.id} setAudio={setAudio} />)
            )
          ) : (
            <CircularProgress sx={{ marginTop: '100px' }} />
          )}
        </Grid>
      </div>
    </div>
  )
}

export default TutorialPage
