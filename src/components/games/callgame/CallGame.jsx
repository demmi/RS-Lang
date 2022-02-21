import React, { useState, useEffect, useContext } from 'react'
import { Button, Grid, Typography } from '@mui/material'
import useSound from 'use-sound'
import correctSound from '@/assets/sounds/correct.mp3'
import errorSound from '@/assets/sounds/error.mp3'
import URL, { DT_GAME_RESULTS, TUTORIAL_PAGE } from '@/components/const'
import { FormStatus, ResultsArray } from '@/components/context'
import Lives from '@/components/games/callgame/Lives'
import { getRandomNumber, shuffle } from '@/components/games/gameUtils'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import { SnackbarProvider, useSnackbar } from 'notistack'

let NUMBER_OF_WORDS

function CallGame({ words }) {
  NUMBER_OF_WORDS = words.length
  return (
    <SnackbarProvider maxSnack={3}>
      <Inside words={words} />
    </SnackbarProvider>
  )
}

const setWordsTranslation = (words, newWordTranslation) => {
  const arrOfTranslations = []
  arrOfTranslations.push(newWordTranslation)

  while (arrOfTranslations.length < 4) {
    const translation = words[getRandomNumber(0, words.length - 1)].wordTranslate
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
  const [btnClicked, setBtnClicked] = useState(false)
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
      const f1 = counter => {
        const newWordTranslation = words[counter].wordTranslate
        setWord(words[counter].word)
        const previousWordAudioURL = wordAudio
        setWordAudio(words[counter].audio)
        setWordTranslation(newWordTranslation)
        setArrOfWords(setWordsTranslation(words, newWordTranslation))
        if (previousWordAudioURL !== words[counter].audio && words[counter].audio) {
          playAudio(`${URL}${words[counter].audio}`)
        }
      }
      f1(wordCounter)
    }

    if (wordCounter === NUMBER_OF_WORDS || livesCount === 0) {
      displayGameResultsForm()
    }
  }, [livesCount, wordCounter, words])

  useEffect(() => {
    const tick = setInterval(
      (seconds => () => {
        setTimer(seconds--)
      })(9),
      1000
    )
    const timer = setTimeout(() => {
      if (livesCount && words && words.length && !btnClicked) {
        playError()
        enqueueSnackbar('Не правильно', { variant: 'error' })
        gameArr[wordCounter].isCatch = true
        setLivesCount(livesCount - 1)
        setWordCounter(wordCounter + 1)
      }
    }, 10000)
    return () => {
      clearInterval(tick)
      clearTimeout(timer)
    }
  }, [words, livesCount, btnClicked, wordCounter])

  const checkAnswer = (wordActive, answerActive) => {
    const correct = wordActive === answerActive
    setAnswer(correct)
    setWordCounter(wordCounter + 1)
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
  }

  const handleWordClick = itemWord => () => {
    setBtnClicked(true)
    setWord('')
    setTimeout(() => {
      setBtnClicked(false)
      checkAnswer(itemWord, wordTranslation)
      setTimeout(() => {
        setAnswer(false)
        setBtnClicked(false)
      }, 500)
    }, 350)
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
              <Button variant="contained" key={itemWord} onClick={handleWordClick(itemWord)}>
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
