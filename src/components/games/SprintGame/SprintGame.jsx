import React, { useState, useContext, useEffect } from 'react'
// import PropTypes from 'prop-types';
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { makeStyles } from '@mui/styles'
import useSound from 'use-sound'
import correctSound from '@/assets/sounds/correct.mp3'
import errorSound from '@/assets/sounds/error.mp3'
import { DT_GAME_RESULTS } from '@/components/const'
import { PageRouter, FormStatus, ResultsArray } from '@/components/context'
import { SnackbarProvider, useSnackbar } from 'notistack'
import statisticsPut from '@/components/api/statisticsPut';

function SprintGame({ words }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <Inside words={words} />
    </SnackbarProvider>
  )
}

const useStyles = makeStyles({
  container: {
    '& svg': {
      color: '#e45731',
    },
  },
})

function Inside({ words }) {
  const { enqueueSnackbar } = useSnackbar()
  const [playError] = useSound(errorSound, { volume: 0.3 })
  const [playCorrect] = useSound(correctSound, { volume: 0.3 })
  const [countDown, setTimer] = useState(60)
  const [stopGame, setStopGame] = useState(true)

  const [curNum, setCurNum] = useState(0)
  const [gameArr] = useState(words)
  const { setDialogType } = useContext(FormStatus)
  const { setResultsArray } = useContext(ResultsArray)

  const [koef, setKoef] = useState(1)
  const [points, setPoints] = useState(10)
  const [score, setScore] = useState(0)
  const [arrIcons, setArrIcons] = useState([false, false, false])
  const [catched, setCatched] = useState(0)
  const [textColor, setTextColor] = useState('black')

  const { setRouterPage } = useContext(PageRouter)

  const classes = useStyles()

  useEffect(() => {
    const tick = setInterval(() => {
      if (stopGame) {
        if (countDown > 0) {
          setTimer(countDown - 1)
        }
      }},
      1000
    )

    return () => {
      clearInterval(tick)
    }
  }, [stopGame, countDown])

  useEffect(() => {
    switch (catched) {
      case 0:
        setArrIcons([false, false, false])
        break;
      case 1:
        setArrIcons([true, false, false])
        break;
      case 2:
        setArrIcons([true, true, false])
        break;
      case 3:
        setArrIcons([true, true, true])
        break;
      default:
        break;
    }

    setPoints(koef * 10)

  }, [catched, koef])

  useEffect(() => {
    switch (koef) {
      case 2:
        setTextColor('green')
        break;
      case 4:
        setTextColor('blue')
        break;
      case 8:
        setTextColor('purple')
        break;
      case 16:
        setTextColor('orange')
        break;
      case 32:
        setTextColor('red')
        break;
      case 64:
        setTextColor('#e16bff')
        break;
      default:
        break;
    }
  }, [koef])

  const displayGameResultsForm = () => {
    setResultsArray(gameArr)
    setDialogType(DT_GAME_RESULTS)
  }

  const handlerAnswer = event => {
    const boolValue = event.currentTarget.dataset.bool

    if (boolValue === gameArr[curNum].isCorrect) {
      enqueueSnackbar('Правильно', { variant: 'success' })
      playCorrect()
      console.log('угадал')
      gameArr[curNum].isCatch = true
      setScore(score + points)

      setCatched(catched + 1)
      if(catched === 2) {
        setTimeout(() => {
          setCatched(0)
          setKoef(koef * 2)
        }, 500)
      }

      statisticsPut(localStorage.demmiUserId, 'угадал')
    } else {
      enqueueSnackbar('Не правильно', { variant: 'error' })
      playError()
      console.log('не угадал')
      gameArr[curNum].isCatch = false

      if(catched > 0) {
        setCatched(catched - 1)
      }

      statisticsPut(localStorage.demmiUserId, 'не угадал')
    }
    const nextNum = curNum + 1
    if (nextNum < gameArr.length) {
      setCurNum(nextNum)
    } else {
      console.log('GAME OVER, exitArr:', words)
      setStopGame(false)
      displayGameResultsForm()
    }
  }

  if(countDown === 0) {
    setStopGame(false)
    displayGameResultsForm()
  }
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={4}>
      <Grid item>
        <Box
          sx={{
            width: '60px',
            height: '60px',
            border: '1px solid green',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="h2">
            {countDown}
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Typography variant="h4" component="h2">
          {score}
        </Typography>
      </Grid>
      <Grid item className={classes.container}>
        {arrIcons.map((el) => el? <FavoriteIcon /> : <FavoriteBorderIcon /> )}
      </Grid>
      <Grid item color={textColor} >
        <Typography variant="h5" component="h3">
          +{points} за верный ответ
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h2">
          {gameArr[curNum].word}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h4" component="h2">
          {gameArr[curNum].outputTranslate}
        </Typography>
      </Grid>
      <Grid item>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="error" sx={{ width: '200px' }} onClick={handlerAnswer} data-bool="false">
            Неверно
          </Button>
          <Button variant="contained" color="success" sx={{ width: '200px' }} onClick={handlerAnswer} data-bool="true">
            Верно
          </Button>
        </Stack>
      </Grid>
    </Grid>
  )
}
// SprintGame.propTypes = {
//   word: PropTypes.object.isRequired,
//   // onApply: PropTypes.func.isRequired,
//   // size: PropTypes.number.isRequired,
//   // theme: PropTypes.oneOf(['ant', 'default']).isRequired,
//   // type: PropTypes.oneOf(['Commodity', 'Employee']).isRequired,
// };

export default SprintGame
