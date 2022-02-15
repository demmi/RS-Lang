import React, { useContext, useState, useEffect } from 'react'
import {
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
  Typography,
} from '@mui/material'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import URL from '@/components/const'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled } from '@mui/styles'
import IsLogged from '@/components/context'
import createUserWord from '@/components/api/createUserWord'

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

  useEffect(() => {
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
    } else if (response === 401) {
      setLogged(false)
    }
    console.log(response)
  }

  const handleLearned = async () => {
    const response = await createUserWord(localStorage.demmiUserId, localStorage.demmiUserToken, id, 'learned')
    if (response === 200) {
      setBgColor('#e8f5e9')
      setLearned(true)
    } else if (response === 401) {
      setLogged(false)
    }
    console.log(response)
  }

  // console.log('render card')

  return (
    <Grid item>
      <Paper elevation={3} sx={{ width: '450px' }}>
        <Card variant="outlined" sx={{ backgroundColor: bgColor }}>
          <CardContent>
            <CardMedia component="img" image={`${URL}${image}`} alt={word} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Typography variant="h4">
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
                  <Button variant="outlined" size="large" disabled={isHard || isLearned} onClick={handleLearned}>
                    Изучено
                  </Button>
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
