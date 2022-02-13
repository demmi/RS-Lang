import React, { useContext, useState } from 'react'
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
  const { isLogged } = useContext(IsLogged)

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
  } = data

  const bgcolor = 'white'

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

  return (
    <Grid item>
      <Paper elevation={3} sx={{ width: '425px' }}>
        <Card variant="outlined" sx={{ backgroundColor: bgcolor }}>
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
              <CardActions>
                <Button variant="outlined" size="large" disabled={!isLogged}>
                  Сложное
                </Button>
                <Button variant="outlined" size="large" disabled={!isLogged}>
                  Изучено
                </Button>
              </CardActions>
            </CardContent>
          </Collapse>
        </Card>
      </Paper>
    </Grid>
  )
}

export default WordCard
