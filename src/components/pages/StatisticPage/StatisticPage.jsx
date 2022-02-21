import React, { useContext } from 'react';
import IsLogged from '@/components/context'

import './StatisticPage.css'
import statisticsGet from '@/components/api/statisticsGet'

function StatisticPage() {
  const { isLogged } = useContext(IsLogged)

  if (isLogged) {
    const setStatistic = async () => {
      const data = await statisticsGet(localStorage.demmiUserId, localStorage.demmiUserToken)

      console.log('StatisticPage, setStatistic, data=', data)

      return data
    }
    setStatistic()

  }

  return (
    <div className="statistic-page">
      <div className="main-page-title">It is StatisticPage</div>
    </div>
  )
}

export default StatisticPage
