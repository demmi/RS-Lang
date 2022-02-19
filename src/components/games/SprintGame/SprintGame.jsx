import React, { useState, useEffect, useContext } from 'react'
import { CircularProgress } from '@mui/material'
import { CUR_ROUTER_PAGE } from '@/components/const'
import { getRandomNumber, shuffle } from '@/components/games/gameUtils'
import IsLogged, { Category, Page, PageRouter } from '@/components/context'
import getWords from '@/components/api/getWords'
import SprintGameUI from './SprintGameUI'

function SprintGame() {
  const { isLogged } = useContext(IsLogged)
  const [loaded, setLoaded] = useState(false)
  const { category } = useContext(Category)
  const { page } = useContext(Page)
  const [words, setWords] = useState(null)
  const { routerPage } = useContext(PageRouter)

  sessionStorage.setItem(CUR_ROUTER_PAGE, routerPage)

  // console.log('category:', category, 'page:', page)

  useEffect(() => {
    const loadData = async () => {
      const data = await getWords(category, page)

      const arrWords = shuffle(data).map(el => {
        const newEl = { ...el }
        // newEl.id = el.id
        // newEl.word = el.word
        // newEl.wordTranslate = el.wordTranslate

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
        const newEl = { ...el }
        // newEl.id = el.id
        // newEl.word = el.word
        newEl.rightTranslate = el.wordTranslate
        const random = getRandomNumber(0, 1)
        newEl.outputTranslate = random === 1 ? el.wordTranslate : arrTranslate[index].word
        newEl.isCorrect = newEl.rightTranslate === newEl.outputTranslate ? 'true' : 'false'

        return newEl
        // const newEl = {...el}
        // // console.log(el, newEl)
        // // newEl.rightTranslate = el.wordTranslate
        // const random = getRandomNumber(0, 1)
        // newEl.outputTranslate = random === 1 ? el.wordTranslate : arrTranslate[index].word
        // newEl.isCorrect = newEl.wordTranslate === newEl.outputTranslate ? 'true' : 'false'

        // return newEl
      })

      setWords(exitArr)
      setLoaded(true)
    }

    loadData()
  }, [isLogged, category, page])

  return loaded ? <SprintGameUI words={words} /> : <CircularProgress />
}

export default SprintGame
