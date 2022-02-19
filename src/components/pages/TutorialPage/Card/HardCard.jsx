import React, { useState } from 'react'
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
} from '@mui/material'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import URL from '@/components/const'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled } from '@mui/styles'
import deleteUserWord from '@/components/api/deleteUserWord'
import updateUserWord from '@/components/api/updateUserWord'

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

function HardCard({ data, setAudio }) {
  const [expanded, setExpanded] = useState(false)
  const [btnDisable, setBtnDisable] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openLearned, setOpenLearned] = useState(false)

  const {
    _id,
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

  const handleDel = async () => {
    const response = await deleteUserWord(localStorage.demmiUserId, localStorage.demmiUserToken, _id)
    if (response === 204) {
      setBtnDisable(true)
      setOpenDelete(true)
    }
  }

  const handleLearned = async () => {
    const response = await updateUserWord(localStorage.demmiUserId, localStorage.demmiUserToken, _id, 'learned')
    if (response === 200) {
      setBtnDisable(true)
      setOpenLearned(true)
    }
  }

  const handleCloseDelete = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenDelete(false)
  }

  const handleCloseLearned = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenLearned(false)
  }

  return (
    <Grid item>
      <Paper elevation={3} sx={{ width: '450px' }}>
        <Card variant="outlined">
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
                <Button variant="outlined" size="large" onClick={handleDel} disabled={btnDisable}>
                  Удалить
                </Button>
                <Snackbar
                  open={openDelete}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  autoHideDuration={6000}
                  onClose={handleCloseDelete}
                  message={`Слово ${word} удалено из "сложных"`}
                >
                  <Alert onClose={handleCloseDelete} variant="filled" severity="error" sx={{ width: '100%' }}>
                    {`Слово ${word} удалено из "сложных"`}
                  </Alert>
                </Snackbar>
                <Button variant="outlined" size="large" onClick={handleLearned} disabled={btnDisable}>
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
            </CardContent>
          </Collapse>
        </Card>
      </Paper>
    </Grid>
  )
}

export default HardCard
