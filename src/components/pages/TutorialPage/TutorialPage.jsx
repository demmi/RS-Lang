import React, { useEffect, useState, useRef, useContext } from 'react'

import './TutorialPage.css'
import WordCard from '@/components/pages/TutorialPage/Card/wordCard'
import { Grid, Stack } from '@mui/material'
import getWords from '@/components/api/getWords'
import getAllUserWords from '@/components/api/getAllUserWords'
import getAllUserAggWords from '@/components/api/getAllUserAggWords';
// import createUserWord from '@/components/api/createUserWord'
import IsLogged, { Category, Page, PaginationCount } from '@/components/context'
import TutorialPagination from './TutorialPagination/TutorialPagination'
import PageOfCategories from './PageOfCategories/PageOfCategories'

function TutorialPage() {
  const [words, setWords] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [audioSrc, setAudio] = useState(null)
  const { isLogged } = useContext(IsLogged)
  const { category } = useContext(Category)
  const { page } = useContext(Page)
  const { setPaginationCount } = useContext(PaginationCount)

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
        if (category !== 7) {
          const userWords = await getAllUserWords(localStorage.demmiUserId, localStorage.demmiUserToken)

          const newData = data.map((el) => {
            const element = {...el}
            userWords.forEach((elm) => {
              if (elm.wordId === el.id) {
                element.difficulty = elm.difficulty
              }
            })
            return element
          })

          // console.log('data:', data)
          // console.log('userWords:', userWords)
          // console.log('newData:', newData);

          setWords(newData)
        } else {
          console.log('this is seven category')
          const filter = { "userWord.difficulty": "hard" }
          const userAggWordsData = await getAllUserAggWords(localStorage.demmiUserId, localStorage.demmiUserToken, page -  1, filter)
          const aggWords = userAggWordsData[0].paginatedResults
          const aggWordsCount = userAggWordsData[0].totalCount[0].count
          const numPage = Math.floor(aggWordsCount / 20) + 1
          console.log('aggWords:', userAggWordsData, 'aggWordsCount:', aggWordsCount, 'numPage:', numPage)
          setPaginationCount(numPage)
          setWords(aggWords)
        }

      } else {
        setWords(data)
      }

      setLoaded(true)
    }
    loadData()
  }, [isLogged, category, page])

  // const setDiffWord = (curWordId) => {
  //   const setData = async () => {
  //     await createUserWord({
  //       userId: localStorage.demmiUserId,
  //       userToken: localStorage.demmiUserToken,
  //       wordId: curWordId,
  //       word: { "difficulty": "hard", "optional": {testFieldString: 'test', testFieldBoolean: true} }
  //     });
  //   }
  //   setData()
  // }

  return (
    <div className="tutorial-category">
      <Stack spacing={2} sx={{ position: 'fixed', top: 85, left: 8, height: '81%', justifyContent: 'space-between', alignItems: 'center'}}>
        <PageOfCategories />
        <div>
          <TutorialPagination sx={{ marginTop: '50px' }} />
          <div className='empty-line'> </div>
        </div>
      </Stack>
      <div className="empty-space"> </div>
      <div className="tutorial-content">
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
          {loaded ? words.map(el => <WordCard data={el} key={el.id} setAudio={setAudio} /* setDiffWord={setDiffWord} */ />) : <h3>Loading Data</h3>}
        </Grid>
      </div>
    </div>
  )
}

export default TutorialPage
