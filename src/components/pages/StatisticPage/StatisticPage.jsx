import React, { useContext, useState, useEffect } from 'react'
import IsLogged from '@/components/context'
import statisticsGet from '@/components/api/statisticsGet'
import { Card, CardContent, CircularProgress, Grid, Paper, Typography } from '@mui/material'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function StatisticPage() {
  const { isLogged } = useContext(IsLogged)
  const [loaded, setLoaded] = useState(false)
  const [seriesCall, setSeriesCall] = useState(0)
  const [seriesSprint, setSeriesSprint] = useState(0)
  const [learnCount, setLearnCount] = useState(0)
  const [arrCall, setCall] = useState([])
  const [arrSprint, setSprint] = useState([])
  const [learned, setLearned] = useState([])

  useEffect(() => {
    if (isLogged) {
      const arrCallExit = []
      const arrSprintExit = []
      const learnedExit = []
      const setStatistic = async () => {
        const data = await statisticsGet(localStorage.demmiUserId, localStorage.demmiUserToken)
        const callGameArr = JSON.parse(data.optional.callgame)
        const sprintGameArr = JSON.parse(data.optional.sprintgame)
        const learnedArr = JSON.parse(data.optional.learned)

        const makeGameExitArr = (arr, arrExit) => {
          if (arr.length === 0) {
            setSeriesCall(0)
          } else if (arr[0].game === 'Call') {
            setSeriesCall(Math.max.apply(null, arr.map(elem => +elem.maxCatch) || 0))
          } else {
            setSeriesSprint(Math.max.apply(null, arr.map(elem => +elem.maxCatch) || 0))
          }
          const tempArrDateIndex = arr.map(el => {
            const newEl = { ...el }
            const date = new Date(el.curDate)
            newEl.curDate = date.toLocaleString('en', { day: '2-digit', month: 'short' })
            return newEl
          })
          const tempArrDateIndexUniq = []
          tempArrDateIndex.forEach(el => {
            if (!tempArrDateIndexUniq.includes(el.curDate)) tempArrDateIndexUniq.push(el.curDate)
          })
          tempArrDateIndexUniq.forEach(el => {
            const newObj = {
              name: null,
              Правильно: 0,
              Неправильно: 0,
            }
            tempArrDateIndex.forEach(elm => {
              if (elm.curDate === el) {
                newObj.name = el
                newObj['Правильно'] += elm.numRightAnswers
                newObj['Неправильно'] += elm.numWrongAnswers
              }
            })
            arrExit.push(newObj)
          })

          let lastDate

          if (arrExit.length === 0) {
            lastDate = new Date()
          } else {
            lastDate = new Date(arr[arr.length - 1].curDate).getTime()
          }

          while (arrExit.length < 10) {
            lastDate += 86400000
            arrExit.push({
              name: new Date(lastDate).toLocaleString('en', { day: '2-digit', month: 'short' }),
              Правильно: 0,
              Неправильно: 0,
            })
          }
        }

        const makeLearnedExitArr = (arr, arrExit) => {
          setLearnCount(arr.length)
          const tempArrDateIndex = arr.map(el => {
            const newEl = { ...el }
            const date = new Date(el.date)
            newEl.date = date.toLocaleString('en', { day: '2-digit', month: 'short' })
            return newEl
          })
          const tempArrDateIndexUniq = []
          tempArrDateIndex.forEach(el => {
            if (!tempArrDateIndexUniq.includes(el.date)) tempArrDateIndexUniq.push(el.date)
          })
          tempArrDateIndexUniq.forEach(el => {
            const newObj = {
              name: null,
              Количество: 0,
            }
            tempArrDateIndex.forEach(elm => {
              if (elm.date === el) {
                newObj.name = el
                newObj['Количество'] += 1
              }
            })
            arrExit.push(newObj)
          })

          let lastDate

          if (arrExit.length === 0) {
            lastDate = new Date()
          } else {
            lastDate = new Date(arr[arr.length - 1].date).getTime()
          }

          while (arrExit.length < 10) {
            lastDate += 86400000
            arrExit.push({
              name: new Date(lastDate).toLocaleString('en', { day: '2-digit', month: 'short' }),
              Количество: 0,
            })
          }
        }

        makeGameExitArr(callGameArr, arrCallExit)
        makeGameExitArr(sprintGameArr, arrSprintExit)
        makeLearnedExitArr(learnedArr, learnedExit)

        setCall(arrCallExit)
        setSprint(arrSprintExit)
        setLearned(learnedExit)
        setLoaded(true)
      }
      setStatistic()
    }
  }, [isLogged])

  return loaded ? (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
      <Grid item>
        <Paper elevation={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Количество изученных слов: {learnCount}</Typography>
              <BarChart width={730} height={250} data={learned}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Количество" fill="blue" />
              </BarChart>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
      <Grid item>
        <Paper elevation={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Игра "Аудиовызов"</Typography>
              <Typography variant="h6">Максимальная серия правильных ответов: {seriesCall}</Typography>
              <BarChart width={730} height={250} data={arrCall}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Правильно" stackId="a" fill="green" />
                <Bar dataKey="Неправильно" stackId="a" fill="red" />
              </BarChart>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
      <Grid item>
        <Paper elevation={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Игра "Спринт"</Typography>
              <Typography variant="h6">Максимальная серия правильных ответов: {seriesSprint}</Typography>
              <BarChart width={730} height={250} data={arrSprint}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Правильно" stackId="a" fill="green" />
                <Bar dataKey="Неправильно" stackId="a" fill="red" />
              </BarChart>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  ) : (
    <CircularProgress sx={{ marginTop: '100px' }} />
  )
}

export default StatisticPage
