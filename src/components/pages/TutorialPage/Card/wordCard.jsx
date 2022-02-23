import React, { useContext, useState, useEffect } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Typography,
  Tooltip,
} from '@mui/material'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import URL from '@/components/const'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled } from '@mui/styles'
import IsLogged from '@/components/context'
import createUserWord from '@/components/api/createUserWord'
import addWordStat from '@/components/pages/TutorialPage/Card/addWordStat'
import AssessmentIcon from '@mui/icons-material/Assessment'
import statisticsGet from '@/components/api/statisticsGet'

function DangerousString({ name }) {
  return <span dangerouslySetInnerHTML={{ __html: name }} />
}

const ExpandMore = styled(props => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
}))

function WordCard({ data, setAudio }) {
  const [expanded, setExpanded] = useState(false)
  const { isLogged, setLogged } = useContext(IsLogged)
  const [isHard, setHard] = useState(false)
  const [isLearned, setLearned] = useState(false)
  const [bgColor, setBgColor] = useState('white')
  const [openHard, setOpenHard] = useState(false)
  const [openLearned, setOpenLearned] = useState(false)
  const [count, setCount] = useState(0)
  const [error, setError] = useState(0)

  const {
    id,
    group,
    page,
    word,
    image,
    audio,
    audioMeaning,
    audioExample,
    textMeaning,
    textExample,
    transcription,
    textExampleTranslate,
    textMeaningTranslate,
    wordTranslate,
    difficulty,
  } = data

  useEffect(async () => {
    if (isLogged) {
      const data = await statisticsGet(localStorage.demmiUserId, localStorage.demmiUserToken)
      const usedWords = JSON.parse(data.optional.word)
      const elem = usedWords.find(e => e.id === id)
      setCount(elem ? elem.count : 0)
      setError(elem ? elem.count - elem.errors : 0)
    }
    if (difficulty === 'hard') {
      setBgColor('#ffebee')
      setHard(true)
    }
    if (difficulty === 'learned') {
      setBgColor('#e8f5e9')
      setLearned(true)
    }
  })

  const speakWord = () => {
    setAudio(`${URL}${audio}`)
  }

  const speakMeaning = () => {
    setAudio(`${URL}${audioMeaning}`)
  }

  const speakExample = () => {
    setAudio(`${URL}${audioExample}`)
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleHard = async () => {
    const response = await createUserWord(localStorage.demmiUserId, localStorage.demmiUserToken, id, 'hard')
    if (response === 200) {
      setBgColor('#ffebee')
      setHard(true)
      setOpenHard(true)
    } else if (response === 401) {
      setLogged(false)
    }
    console.log(response)
  }

  const handleLearned = async () => {
    const response = await createUserWord(localStorage.demmiUserId, localStorage.demmiUserToken, id, 'learned')
    if (response === 200) {
      await addWordStat(id)
      setBgColor('#e8f5e9')
      setLearned(true)
      setOpenLearned(true)
    } else if (response === 401) {
      setLogged(false)
    }
  }

  const handleCloseLearned = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenLearned(false)
  }

  const handleCloseHard = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenHard(false)
  }

  return (
    <Grid item>
      <Paper elevation={3} sx={{ width: '450px' }}>
        <Card variant="outlined" sx={{ backgroundColor: bgColor }}>
          <CardContent>
            <CardMedia component="img" image={`${URL}${image}`} alt={word} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Typography variant="h4">
                {isLogged ? (
                  <Tooltip title={`Слово появлялось в играх ${count} раз(a), правильных ответов ${error}`}>
                    <AssessmentIcon sx={{ margin: '10px' }} />
                  </Tooltip>
                ) : (
                  ''
                )}
                {word} : {transcription}
              </Typography>
              <IconButton aria-label="play/pause" onClick={speakWord}>
                <RecordVoiceOverIcon sx={{ height: 38, width: 38 }} />
              </IconButton>
            </Box>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {wordTranslate}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'space-between' }}>
                <Typography>
                  <DangerousString name={textMeaning} />
                </Typography>
                <IconButton aria-label="play/pause" onClick={speakMeaning}>
                  <RecordVoiceOverIcon sx={{ height: 35, width: 35 }} />
                </IconButton>
              </Box>
              <Typography color="text.secondary">{textMeaningTranslate}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'space-between' }}>
                <Typography>
                  <DangerousString name={textExample} />
                </Typography>
                <IconButton aria-label="play/pause" onClick={speakExample}>
                  <RecordVoiceOverIcon sx={{ height: 35, width: 35 }} />
                </IconButton>
              </Box>
              <Typography color="text.secondary">{textExampleTranslate}</Typography>
              {isLogged ? (
                <CardActions>
                  <Button variant="outlined" size="large" disabled={isHard || isLearned} onClick={handleHard}>
                    Сложное
                  </Button>
                  <Snackbar
                    open={openHard}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    autoHideDuration={6000}
                    onClose={handleCloseHard}
                  >
                    <Alert onClose={handleCloseHard} variant="filled" severity="error" sx={{ width: '100%' }}>
                      {`Слово ${word} помечено как "сложное"`}
                    </Alert>
                  </Snackbar>
                  <Button variant="outlined" size="large" disabled={isHard || isLearned} onClick={handleLearned}>
                    Изучено
                  </Button>
                  <Snackbar
                    open={openLearned}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    autoHideDuration={6000}
                    onClose={handleCloseLearned}
                  >
                    <Alert onClose={handleCloseLearned} variant="filled" severity="error" sx={{ width: '100%' }}>
                      {`Слово ${word} помечено как "изученное"`}
                    </Alert>
                  </Snackbar>
                </CardActions>
              ) : (
                ''
              )}
            </CardContent>
          </Collapse>
        </Card>
      </Paper>
    </Grid>
  )
}

export default WordCard
