import React, { useContext, useEffect } from 'react'
import IsLogged, { GameStatistic } from '@/components/context'

import './StatisticPage.css'
import statisticsGet from '@/components/api/statisticsGet'
import getAllUserWords from '@/components/api/getAllUserWords'
import statisticsPut from '@/components/api/statisticsPut'

function StatisticPage() {
  const { isLogged } = useContext(IsLogged)
  // const { gameStatistic, setGameStatistic } = useContext(GameStatistic)

  // useEffect(() => {
  if (isLogged) {
    const setStatistic = async () => {
      const data = await statisticsGet(localStorage.demmiUserId, localStorage.demmiUserToken)
      // const userWords = await getAllUserWords(localStorage.demmiUserId, localStorage.demmiUserToken)
      // const learnedWords = userWords.filter(elem => elem.difficulty === 'learned')
      // const learnedWordsCount = learnedWords.length
      // const callStr = JSON.parse(data.optional.callgame)
      // const sprint = JSON.parse(data.optional.sprintgame)
      // // const learned = JSON.parse(data.optional.learned)
      // const learned = learnedWords.map(elem => ({ id: elem.wordId, date: Date.now() }))
      // console.log('StatisticPage, setStatistic, data=', learned)
      // statisticsPut(localStorage.demmiUserId, localStorage.demmiUserToken, learnedWordsCount, callStr, sprint, learned)
      console.log(JSON.parse(data.optional.learned))
      return data
    }
    setStatistic()

    // console.log('StatisticPage, gameStatistic=', gameStatistic)
  }
  // }, [isLogged, gameStatistic, setGameStatistic])

  return (
    <div className="statistic-page">
      <div className="main-page-title">It is StatisticPage</div>
    </div>
  )
}

export default StatisticPage
