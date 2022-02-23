import React, { useState, useEffect, useContext } from 'react'
import { Button, Grid, Typography } from '@mui/material'
import useSound from 'use-sound'
import correctSound from '@/assets/sounds/correct.mp3'
import errorSound from '@/assets/sounds/error.mp3'
import URL, { DT_GAME_RESULTS } from '@/components/const'
import { FormStatus, ResultsArray } from '@/components/context'
import Lives from '@/components/games/callgame/Lives'
import { getRandomNumber, shuffle } from '@/components/games/gameUtils'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import { SnackbarProvider, useSnackbar } from 'notistack'
import getWords from '@/components/api/getWords'

let NUMBER_OF_WORDS

function CallGame({ words }) {
  NUMBER_OF_WORDS = words.length
  return (
    <SnackbarProvider maxSnack={3}>
      <Inside words={words} />
    </SnackbarProvider>
  )
}

const setWordsTranslation = async (words, newWordTranslation) => {
  let reserve
  if (words.length < 4) {
    reserve = await getWords(getRandomNumber(1, 5), getRandomNumber(1, 29))
  }
  const arrOfTranslations = []
  arrOfTranslations.push(newWordTranslation)
  let translation
  while (arrOfTranslations.length < 4) {
    if (words.length < 4) {
      translation = reserve[getRandomNumber(0, reserve.length - 1)].wordTranslate
    } else {
      translation = words[getRandomNumber(0, words.length - 1)].wordTranslate
    }
    if (!arrOfTranslations.includes(translation)) {
      arrOfTranslations.push(translation)
    }
  }
  return shuffle(arrOfTranslations)
}

function Inside({ words }) {
  const [playError] = useSound(errorSound, { volume: 0.3 })
  const [playCorrect] = useSound(correctSound, { volume: 0.3 })
  const [answer, setAnswer] = useState('')
  const [arrOfWords, setArrOfWords] = useState([])
  const [livesCount, setLivesCount] = useState(5)
  const [word, setWord] = useState('')
  const [wordAudio, setWordAudio] = useState('')
  const [wordTranslation, setWordTranslation] = useState('')
  const [wordCounter, setWordCounter] = useState(0)
  const [countDown, setTimer] = useState(9)
  const { enqueueSnackbar } = useSnackbar()
  const [gameArr] = useState(words)
  const { setDialogType } = useContext(FormStatus)
  const { setResultsArray } = useContext(ResultsArray)

  const audioPlayer = new Audio()
  audioPlayer.volume = 0.5

  const displayGameResultsForm = () => {
    setResultsArray(gameArr)
    setDialogType(DT_GAME_RESULTS)
  }

  const playAudio = url => {
    audioPlayer.src = url
    audioPlayer.load()
    audioPlayer.play()
  }

  useEffect(() => {
    if (livesCount > 0 && wordCounter < NUMBER_OF_WORDS) {
      const f1 = async counter => {
        const newWordTranslation = words[counter].wordTranslate
        setWord(words[counter].word)
        const previousWordAudioURL = wordAudio
        setWordAudio(words[counter].audio)
        setWordTranslation(newWordTranslation)
        const trans = await setWordsTranslation(words, newWordTranslation)
        setArrOfWords(trans)
        if (previousWordAudioURL !== words[counter].audio && words[counter].audio) {
          playAudio(`${URL}${words[counter].audio}`)
        }
      }
      f1(wordCounter)
    }
    // if (wordCounter === NUMBER_OF_WORDS || livesCount === 0)
    else {
      displayGameResultsForm()
    }
  }, [wordCounter])

  useEffect(() => {
    if (wordCounter < NUMBER_OF_WORDS) {
      const tick = setInterval(
        (seconds => () => {
          setTimer(--seconds)
        })(10),
        1000
      )
      const timer = setTimeout(() => {
        if (livesCount && words && words.length) {
          playError()
          enqueueSnackbar('Не правильно', { variant: 'error' })
          gameArr[wordCounter].isCatch = false
          setLivesCount(livesCount - 1)
          setWordCounter(wordCounter + 1)
        }
      }, 10000)
      return () => {
        clearInterval(tick)
        clearTimeout(timer)
      }
    }
    return false
  }, [wordCounter])

  const checkAnswer = event => {
    const correct = event.target.dataset.answer === wordTranslation
    setAnswer(correct)
    if (correct) {
      playCorrect()
      enqueueSnackbar('Правильно', { variant: 'success' })
      gameArr[wordCounter].isCatch = true
    } else {
      playError()
      setLivesCount(livesCount - 1)
      enqueueSnackbar('Не правильно', { variant: 'error' })
      gameArr[wordCounter].isCatch = false
    }
    setWordCounter(wordCounter + 1)
  }

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={8}>
      <Grid item>
        <Lives livesCount={livesCount} />
      </Grid>
      <Grid item>
        <Typography variant="h2" component="h2">
          {countDown}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          startIcon={<RecordVoiceOverIcon />}
          onClick={() => {
            playAudio(`${URL}${words[wordCounter].audio}`)
          }}
        >
          repeat
        </Button>
      </Grid>
      <Grid item>
        <Grid container spacing={1}>
          {arrOfWords.map(itemWord => (
            <Grid item>
              <Button variant="contained" key={itemWord} data-answer={itemWord} onClick={checkAnswer}>
                {itemWord}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CallGame
