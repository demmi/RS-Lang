import React, { useContext, useState, useEffect } from 'react';
import IsLogged from '@/components/context'

import './StatisticPage.css'
import statisticsGet from '@/components/api/statisticsGet'
// import getAllUserWords from '@/components/api/getAllUserWords';
// import statisticsPut from '@/components/api/statisticsPut';

import Histogram from 'react-chart-histogram';
import { CircularProgress } from '@mui/material';
import { Sprint } from '@/assets/images/sprint.jpg';

function StatisticPage() {
  const { isLogged } = useContext(IsLogged)
  const [loaded, setLoaded] = useState(false)
  const [labelsSprint, setLabelsSprint] = useState([])
  const [dataHSprint, setDataHSprint] = useState([])

  const labels = ['2016', '2017', '2018', '2017', '2018', '2017', '2018', '2017', '2018', '2017', '2018', '2017', '2018', '2017', '2018', '2017', '2018', '2017', '2018', '2017', '2018'];
  const dataH = [56, 45, 70, 45, 70, 45, 70, 45, 70, 45, 70];
  const options = { fillColor: '#FFFFFF', strokeColor: '#0000FF' };

  useEffect(() => {
    if (isLogged) {
      const setStatistic = async () => {
        const data = await statisticsGet(localStorage.demmiUserId, localStorage.demmiUserToken)
        // curDate: 1645542772479
        // game: "Call"
        // maxCatch: 18
        // numRightAnswers: 19
        // numWrongAnswers: 1
        // totalWord: 20

        // const data = [
        //   {
        //     name: "14 Feb",
        //     'Правильно': 4000,
        //     'Не правильно': 2400,
        //   },
        //   {
        //     name: "Page B",
        //     'Правильно': 3000,
        //     'Не правильно': 1398,
        //   },
        // ];
        const callGameArr = JSON.parse(data.optional.callgame)
        const sprintGameArr = JSON.parse(data.optional.sprintgame)
        const learnedArr = JSON.parse(data.optional.learned)
        console.log('data:', data)
        //
        const arrCallExit = []
        const arrSprintExit = []
        const learnedExit = []

        const makeGameExitArr = (arr, arrExit) => {
          const tempArrDateIndex = arr.map((el) => {
            const newEl = {...el}
            const date = new Date(el.curDate)
            newEl.curDate = date.toLocaleString('en', {day: '2-digit', month: 'short'})
            return newEl
          })
          const tempArrDateIndexUniq = []
          tempArrDateIndex.forEach((el) => {
            if(!tempArrDateIndexUniq.includes(el.curDate)) tempArrDateIndexUniq.push(el.curDate)
          })
          tempArrDateIndexUniq.forEach((el) => {
            const newObj = {
              name: null,
              'Правильно': 0,
              'Неправильно': 0
            }
            tempArrDateIndex.forEach((elm) => {
              if(elm.curDate === el) {
                newObj.name = el
                newObj['Правильно'] += elm.numRightAnswers
                newObj['Неправильно'] += elm.numWrongAnswers
              }
            })
            arrExit.push(newObj)
          })
        }

        const makeLearnedExitArr = (arr, arrExit) => {
          const tempArrDateIndex = arr.map((el) => {
            const newEl = {...el}
            const date = new Date(el.date)
            newEl.date = date.toLocaleString('en', {day: '2-digit', month: 'short'})
            return newEl
          })
          const tempArrDateIndexUniq = []
          tempArrDateIndex.forEach((el) => {
            if(!tempArrDateIndexUniq.includes(el.date)) tempArrDateIndexUniq.push(el.date)
          })
          tempArrDateIndexUniq.forEach((el) => {
            const newObj = {
              name: null,
              'Количество': 0
            }
            tempArrDateIndex.forEach((elm) => {
              if(elm.date === el) {
                newObj.name = el
                newObj['Количество'] += 1
              }
            })
            arrExit.push(newObj)
          })
        }

        makeGameExitArr(callGameArr, arrCallExit)
        makeGameExitArr(sprintGameArr, arrSprintExit)
        makeLearnedExitArr(learnedArr, learnedExit)


        console.log('arrCallExit:', arrCallExit, 'arrSprintExit:', arrSprintExit, 'learnedExit:', learnedExit)



        //
        setLabelsSprint(sprintGameArr.map((el) => {
          const date = new Date(el.curDate)
          return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        }))
        setDataHSprint(sprintGameArr.map((el) => (el.numRightAnswers / el.totalWord) * 100))
        // console.log('time:', `${new Date( sprintGameArr[0].curDate).getFullYear()}` )

        // console.log('sprintGameArr:', sprintGameArr, Array.isArray(sprintGameArr))
        setLoaded(true)
      }
      setStatistic()
    }
  }, [isLogged])

  return (
    <div className="statistic-page">
      <div className="main-page-title">It is StatisticPage</div>

      {loaded ? (
          <>
            <Histogram
            xLabels={labels}
            yValues={dataH}
            width='400'
            height='200'
            options={options}
            />
            <Histogram
            xLabels={labelsSprint}
            yValues={dataHSprint}
            width='600'
            height='400'
            options={options}
            />
          </>
          ) : (
            <CircularProgress sx={{ marginTop: '100px' }} />
          )}
    </div>
  )
}

export default StatisticPage
