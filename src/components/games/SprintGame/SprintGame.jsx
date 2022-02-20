import React, { useState, useContext, useEffect } from 'react'
// import PropTypes from 'prop-types';
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import useSound from 'use-sound'
import correctSound from '@/assets/sounds/correct.mp3'
import errorSound from '@/assets/sounds/error.mp3'
import { DT_GAME_RESULTS, LOAD_GAME, GAMES_PAGE } from '@/components/const'
import Lives from '@/components/games/callgame/Lives'
import IsLogged, { Category, Page, PaginationCount, PageRouter, FormStatus, ResultsArray } from '@/components/context'
import { SnackbarProvider, useSnackbar } from 'notistack'

// const NUMBER_OF_WORDS = 20

// const setWordsTranslation = (words, newWordTranslation) => {
//   const arrOfTranslations = []
//   arrOfTranslations.push(newWordTranslation)

//   while (arrOfTranslations.length < 4) {
//     const translation = words[getRandomNumber(0, words.length - 1)].wordTranslate
//     if (!arrOfTranslations.includes(translation)) {
//       arrOfTranslations.push(translation)
//     }
//   }
//   return shuffle(arrOfTranslations)
// }

// function SprintGame({ words, onWordSelect, onGameEnd }) {
function SprintGame({ words }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <Inside words={words} />
    </SnackbarProvider>
  )
}

function Inside({ words }) {
  const { enqueueSnackbar } = useSnackbar()
  const [playError] = useSound(errorSound, { volume: 0.3 })
  const [playCorrect] = useSound(correctSound, { volume: 0.3 })
  // const [answer, setAnswer] = useState('')
  // const [arrOfWords, setArrOfWords] = useState([])
  // const [btnClicked, setBtnClicked] = useState(false)
  // const [livesCount, setLivesCount] = useState(5)
  // const [word, setWord] = useState('')
  // const [wordAudio, setWordAudio] = useState('')
  // const [wordTranslation, setWordTranslation] = useState('')
  // const [wordCounter, setWordCounter] = useState(0)
  // const [currentSeries, setCurrentSeries] = useState(0)
  const [countDown, setTimer] = useState(5)
  const [stopGame, setStopGame] = useState(true)
  // const audioPlayer = new Audio()
  // audioPlayer.volume = 0.5
  // console.log(words)
  const [curNum, setCurNum] = useState(0)
  const [gameArr] = useState(words)
  const { setDialogType } = useContext(FormStatus)
  const { setResultsArray } = useContext(ResultsArray)

  const [points, setPoints] = useState(10)
  const [koef, setKoef] = useState(1)
  const [score, setScore] = useState(0)
  const { routerPage, setRouterPage } = useContext(PageRouter)

  // console.log('exitArr:', words)
  // const playAudio = url => {
  //   audioPlayer.src = url
  //   audioPlayer.load()
  //   audioPlayer.play()
  // }

  // useEffect(() => {
  //   if (words !== null && words.length && livesCount && wordCounter < NUMBER_OF_WORDS) {
  //     const f1 = counter => {
  //       const newWordTranslation = words[counter].wordTranslate
  //       setWord(words[counter].word)
  //       const previousWordAudioURL = wordAudio
  //       setWordAudio(words[counter].audio)
  //       setWordTranslation(newWordTranslation)
  //       setArrOfWords(setWordsTranslation(words, newWordTranslation))
  //       if (previousWordAudioURL !== words[counter].audio && words[counter].audio) {
  //         playAudio(`${URL}${words[counter].audio}`)
  //       }
  //     }
  //     f1(wordCounter)
  //   }

  //   if (wordCounter === NUMBER_OF_WORDS) {
  //     onGameEnd()
  //   }
  // }, [livesCount, wordCounter, words])

  useEffect(() => {
    // const tick = setInterval(
    //   (seconds => () => {
    //     setTimer(seconds - 1)
    //   })(9),
    //   1000
    // )
    const tick = setInterval(() => {
      if(stopGame) {
        if(countDown > 0) {
          setTimer(countDown - 1)
        }
      }},
      1000
    )
    // tick()
    // const timer = setTimeout(() => {
    //   if (livesCount && words && words.length && !btnClicked) {
    //     playError()
    //     setLivesCount(livesCount - 1)
    //     setWordCounter(wordCounter + 1)
    //     onWordSelect(words[wordCounter], { failed: true })
    //   }
    // }, 10000)
    return () => {
      clearInterval(tick)
      // clearTimeout(timer)
    }
  }, [countDown, /* onWordSelect, words, livesCount, btnClicked, wordCounter */])

  // const checkAnswer = (wordActive, answerActive) => {
  //   const correct = wordActive === answerActive
  //   setAnswer(correct)
  //   setWordCounter(wordCounter + 1)
  //   if (correct) {
  //     setCurrentSeries(currentSeries + 1)
  //     playCorrect()
  //     onWordSelect(words[wordCounter], { succeed: true })
  //   } else {
  //     setLivesCount(livesCount - 1)
  //     playError()
  //     onWordSelect(words[wordCounter], { failed: true })
  //   }
  // }

  // const handleWordClick = itemWord => () => {
  //   setBtnClicked(true)
  //   setWord('')
  //   setTimeout(() => {
  //     setBtnClicked(false)
  //     checkAnswer(itemWord, wordTranslation)
  //     setTimeout(() => {
  //       setAnswer(false)
  //       setBtnClicked(false)
  //     }, 500)
  //   }, 350)
  // }

  const displayGameResultsForm = () => {
    setRouterPage(GAMES_PAGE)
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
      setScore(score + points * koef)
    } else {
      enqueueSnackbar('Не правильно', { variant: 'error' })
      playError()
      console.log('не угадал')
      gameArr[curNum].isCatch = false
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
    // setStopGame(false)
    displayGameResultsForm()
  }
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={4}>
      <Grid item>
        <Box sx={{ width: '60px', height: '60px',
          border: '1px solid green', borderRadius: '50%', display: 'flex',
          justifyContent: 'center', alignItems: 'center'}} >
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
      <Grid item>
        {/* <Lives livesCount={livesCount} gameOver={() => onGameEnd(wordCounter - 1)} /> */}
        <FavoriteBorderIcon />
        <FavoriteIcon />
        <FavoriteIcon />
      </Grid>
      <Grid item>
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
