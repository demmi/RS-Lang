import React, { useState, useEffect, useContext } from 'react'
import { Button, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import useSound from 'use-sound'
import correctSound from '@/assets/sounds/correct.mp3'
import errorSound from '@/assets/sounds/error.mp3'
import URL from '@/components/const'
import Lives from '@/components/games/callgame/Lives'
import { getRandomNumber, shuffle } from '@/components/games/callgame/gameUtils'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import IsLogged, { Category, Page, PaginationCount, PageRouter } from '@/components/context'
import { CUR_ROUTER_PAGE } from '@/components/const'

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
function SprintGameUI({ words }) {
  // const [playError] = useSound(errorSound, { volume: 0.3 })
  // const [playCorrect] = useSound(correctSound, { volume: 0.3 })
  // const [answer, setAnswer] = useState('')
  // const [arrOfWords, setArrOfWords] = useState([])
  // const [btnClicked, setBtnClicked] = useState(false)
  // const [livesCount, setLivesCount] = useState(5)
  // const [word, setWord] = useState('')
  // const [wordAudio, setWordAudio] = useState('')
  // const [wordTranslation, setWordTranslation] = useState('')
  // const [wordCounter, setWordCounter] = useState(0)
  // const [currentSeries, setCurrentSeries] = useState(0)
  // const [countDown, setTimer] = useState(9)
  // const audioPlayer = new Audio()
  // audioPlayer.volume = 0.5
  // console.log(words)
  const [curNum, setCurNum] = useState(0)
  const [gameArr, setGameArr] = useState(words)

  console.log('exitArr:', words)
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

  // useEffect(() => {
  //   const tick = setInterval(
  //     (seconds => () => {
  //       setTimer(seconds--)
  //     })(9),
  //     1000
  //   )
  //   const timer = setTimeout(() => {
  //     if (livesCount && words && words.length && !btnClicked) {
  //       playError()
  //       setLivesCount(livesCount - 1)
  //       setWordCounter(wordCounter + 1)
  //       onWordSelect(words[wordCounter], { failed: true })
  //     }
  //   }, 10000)
  //   return () => {
  //     clearInterval(tick)
  //     clearTimeout(timer)
  //   }
  // }, [onWordSelect, words, livesCount, btnClicked, wordCounter])

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

  const handlerAnswer = (event) => {
    const boolValue = event.currentTarget.dataset.bool
    // console.log('boolValue:', boolValue, gameArr[curNum].isCorrect, 'сравнение:', boolValue === gameArr[curNum].isCorrect )
    if(boolValue === gameArr[curNum].isCorrect) {
      console.log('угадал')
      gameArr[curNum].isCatch = true
    } else {
      console.log('не угадал')
      gameArr[curNum].isCatch = false
    }
    const nextNum = curNum + 1
    if(nextNum < gameArr.length) {
      setCurNum(nextNum)
    } else {
      console.log('GAME OVER, exitArr:', words)
    }

  }

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={8}>
      <Grid item>
        {/* <Lives livesCount={livesCount} gameOver={() => onGameEnd(wordCounter - 1)} /> */}
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
          <Button variant="contained" color='error' sx={{width:'200px'}} onClick={handlerAnswer} data-bool='false'>Неверно</Button>
          <Button variant="contained" color='success' sx={{width:'200px'}} onClick={handlerAnswer} data-bool='true'>Верно</Button>
        </Stack>
      </Grid>
      <Grid item>
        <Grid container spacing={1}>
          {/* {arrOfWords.map(itemWord => (
            <Grid item>
              <Button variant="contained" key={itemWord} onClick={handleWordClick(itemWord)}>
                {itemWord}
              </Button>
            </Grid>
          ))} */}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SprintGameUI
