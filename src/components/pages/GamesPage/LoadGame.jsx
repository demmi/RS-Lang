import React, { useContext, useEffect, useState } from 'react'

import CallGame from '@/components/games/callgame/CallGame'
import getWords from '@/components/api/getWords'
import getAllUserAggWords from '@/components/api/getAllUserAggWords';
import IsLogged, { Category, Page, SelectedGame, SourceRoute } from '@/components/context'
import { CircularProgress } from '@mui/material'
import SprintGame from '@/components/games/SprintGame/SprintGame'
import { shuffle, getRandomNumber } from '@/components/games/gameUtils';
import getAllUserWords from '@/components/api/getAllUserWords';
import { TUTORIAL_PAGE } from '@/components/const';

function LoadGame() {
  const { game } = useContext(SelectedGame)
  const { category } = useContext(Category)
  const { isLogged } = useContext(IsLogged)
  const { page } = useContext(Page)
  const { gameRoute } = useContext(SourceRoute)
  const [words, setWords] = useState(null)
  const [loaded, setLoaded] = useState(false)

    useEffect(() => {
    const loadData = async () => {

      if(category < 6) {
        let data = await getWords(category, page)

        if (gameRoute === TUTORIAL_PAGE && isLogged) {
          const allUserWords = await getAllUserWords(localStorage.demmiUserId, localStorage.demmiUserToken)

          const temp = data.filter((elem) => !allUserWords.filter((el) => el.difficulty === 'learned').map((el) => el.wordId).includes(elem.id))

          while(temp.length < 20) {
            const temp1 = await getWords(category, getRandomNumber(0, 29))
            const temp2 = temp1.filter((elem) => !allUserWords.filter((el) => el.difficulty === 'learned').map((el) => el.wordId).includes(elem.id))

            temp2.forEach((el) => {
              if (!temp.map((elem) => elem.id).includes(el.id)) {
                if (temp.length < 20) {
                  temp.push(el)
                }
              }
            })
          }

          data = temp
        }

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
