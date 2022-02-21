import React, { useContext, useEffect, useState } from 'react'

import CallGame from '@/components/games/callgame/CallGame'
import getWords from '@/components/api/getWords'
import getAllUserAggWords from '@/components/api/getAllUserAggWords';
import IsLogged, { Category, Page, SelectedGame } from '@/components/context'
import { CircularProgress } from '@mui/material'
import SprintGame from '@/components/games/SprintGame/SprintGame'
import { shuffle, getRandomNumber } from '@/components/games/gameUtils';

function LoadGame() {
  const { game } = useContext(SelectedGame)
  const { category } = useContext(Category)
  const { isLogged } = useContext(IsLogged)
  const { page } = useContext(Page)
  const [words, setWords] = useState(null)
  const [loaded, setLoaded] = useState(false)

    useEffect(() => {
    const loadData = async () => {

      if(category < 6) {
        const data = await getWords(category, page)

        if (game === 'Call') {
          setWords(data)
        } else {
          const arrWords = shuffle(data).map((el) => {
            const newEl = {...el}

            return newEl
          })
          const arrTranslate = shuffle(data)
            .reverse()
            .map(el => {
              const newEl = {}
              newEl.id = el.id
              newEl.word = el.wordTranslate

              return newEl
            })
          const exitArr = arrWords.map((el, index) => {
            const newEl = {...el}
            newEl.rightTranslate = el.wordTranslate
            const random = getRandomNumber(0, 1)
            newEl.outputTranslate = random === 1 ? el.wordTranslate : arrTranslate[index].word
            newEl.isCorrect = newEl.rightTranslate === newEl.outputTranslate ? 'true' : 'false'

            return newEl
          })

          setWords(exitArr)
        }
      } else {
        const filter = { 'userWord.difficulty': 'hard' }
        const userAggWordsData = await getAllUserAggWords(
          localStorage.demmiUserId,
          localStorage.demmiUserToken,
          page,
          filter
        )
        const data = userAggWordsData[0].paginatedResults

        if (game === 'Call') {
          setWords(data)
        } else {
          const arrWords = shuffle(data).map((el) => {
            const newEl = {...el}

            return newEl
          })
          const arrTranslate = shuffle(data)
            .reverse()
            .map(el => {
              const newEl = {}
              newEl.id = el.id
              newEl.word = el.wordTranslate

              return newEl
            })
          const exitArr = arrWords.map((el, index) => {
            const newEl = {...el}
            newEl.rightTranslate = el.wordTranslate
            const random = getRandomNumber(0, 1)
            newEl.outputTranslate = random === 1 ? el.wordTranslate : arrTranslate[index].word
            newEl.isCorrect = newEl.rightTranslate === newEl.outputTranslate ? 'true' : 'false'

            return newEl
          })

          setWords(exitArr)
        }
      }

      setLoaded(true)
    }

    loadData()
  }, [isLogged, category, page, game])

  if (game === 'Call') {
    return loaded ? <CallGame words={words} /> : <CircularProgress />
  }
  if (game === 'Sprint') {
    return loaded ? <SprintGame words={words} /> : <CircularProgress />
  }
  return <div />
}

export default LoadGame
