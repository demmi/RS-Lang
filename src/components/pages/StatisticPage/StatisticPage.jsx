import React, { useContext, useEffect } from 'react';
import IsLogged, { GameStatistic } from '@/components/context'

import './StatisticPage.css';
import statisticsGet from '@/components/api/statisticsGet';

function StatisticPage() {
  const { isLogged } = useContext(IsLogged)
  // const { gameStatistic, setGameStatistic } = useContext(GameStatistic)

  // useEffect(() => {
    if(isLogged) {
      const setStatistic = async () => {
        const data = await statisticsGet(localStorage.demmiUserId)

        // setGameStatistic(data)
      console.log('StatisticPage, setStatistic, data=', data)

        return data
      }
      setStatistic()

      // console.log('StatisticPage, gameStatistic=', gameStatistic)
    }
  // }, [isLogged, gameStatistic, setGameStatistic])




  return (
    <div className="statistic-page">
      <div className="main-page-title">
        It is StatisticPage
      </div>
    </div>
  );
};

export default StatisticPage;