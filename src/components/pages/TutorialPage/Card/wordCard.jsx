import React, { useEffect, useRef, useState } from 'react'
import { Box, Card, CardContent, CardMedia, Grid, IconButton, Paper, Typography } from '@mui/material'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import URL from '@/components/const'

function DangerousString({ name }) {
  return <span dangerouslySetInnerHTML={{ __html: name }} />
}

function WordCard({ data, setAudio }) {
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

  const speakWord = () => {
    setAudio(`${URL}${audio}`)
  }

  const speakMeaning = () => {
    setAudio(`${URL}${audioMeaning}`)
  }

  const speakExample = () => {
    setAudio(`${URL}${audioExample}`)
  }

  return (
    <Grid item>
      <Paper elevation={3}>
        <Card variant="outlined" sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <CardMedia component="img" image={`${URL}${image}`} alt={word} sx={{ width: '390px' }} />
          </Box>
          <Box>
            <CardContent>
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
            </CardContent>
          </Box>
        </Card>
      </Paper>
    </Grid>
  )
}

export default WordCard