import React from 'react'
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material'
import URL from '@/components/const'

const word = {
  id: '5e9f5ee35eb9e72bc21af4a0',
  group: 0,
  page: 0,
  word: 'alcohol',
  image: 'files/01_0002.jpg',
  audio: 'files/01_0002.mp3',
  audioMeaning: 'files/01_0002_meaning.mp3',
  audioExample: 'files/01_0002_example.mp3',
  textMeaning: '<i>Alcohol</i> is a type of drink that can make people drunk.',
  textExample: 'A person should not drive a car after he or she has been drinking <b>alcohol</b>.',
  transcription: '[ǽlkəhɔ̀ːl]',
  textExampleTranslate: 'Человек не должен водить машину после того, как он выпил алкоголь',
  textMeaningTranslate: 'Алкоголь - это тип напитка, который может сделать людей пьяными',
  wordTranslate: 'алкоголь',
}
function String1() {
  const str = document.createElement('p')
  str.innerHTML = word.textMeaning
  const str1 = document.createElement('div')
  str1.append(str)
  return <div dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
}

function WordCard() {
  return (
    <Grid item>
      <Paper elevation={3}>
        <Card variant="outlined" sx={{ display: 'flex' }}>
          <Box>
            <CardMedia component="img" image={`${URL}${word.image}`} alt={word.word} />
          </Box>
          <Box>
            <CardContent>
              <Typography variant="h4">
                {word.word} : {word.transcription}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {word.wordTranslate}
              </Typography>
              <Typography color="text.secondary">{word.textMeaning}</Typography>
              <Typography color="text.secondary" gutterBottom>
                {word.textMeaningTranslate}
              </Typography>
              <Typography color="text.secondary">{word.textExample}</Typography>
              <String1 />
            </CardContent>
          </Box>
        </Card>
      </Paper>
    </Grid>
  )
}

export default WordCard
