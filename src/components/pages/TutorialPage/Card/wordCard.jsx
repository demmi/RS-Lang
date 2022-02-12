import React, { useState } from 'react'
import { Box, Card, CardContent, CardMedia, Grid, IconButton, Paper, Typography } from '@mui/material'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import URL from '@/components/const'
import useSound from 'use-sound'

// const word = {
//   id: '5e9f5ee35eb9e72bc21af4a0',
//   group: 0,
//   page: 0,
//   word: 'alcohol',
//   image: 'files/01_0002.jpg',
//   audio: 'files/01_0002.mp3',
//   audioMeaning: 'files/01_0002_meaning.mp3',
//   audioExample: 'files/01_0002_example.mp3',
//   textMeaning: '<i>Alcohol</i> is a type of drink that can make people drunk.',
//   textExample: 'A person should not drive a car after he or she has been drinking <b>alcohol</b>.',
//   transcription: '[ǽlkəhɔ̀ːl]',
//   textExampleTranslate: 'Человек не должен водить машину после того, как он выпил алкоголь',
//   textMeaningTranslate: 'Алкоголь - это тип напитка, который может сделать людей пьяными',
//   wordTranslate: 'алкоголь',
// }

function DangerousString({ name }) {
  return <span dangerouslySetInnerHTML={{ __html: name }} />
}

function WordCard({ data /*, setAudio , playSound */ }) {
  const { id, group, page, word, image, audio, audioMeaning, audioExample, textMeaning,
    textExample, transcription, textExampleTranslate, textMeaningTranslate, wordTranslate
  } = data

  const [audioSrc, setAudioSrc] = useState(null)
  // const [speakWord] = useSound(`${URL}${audio}`, { interrupt: true })
  // const [speakMeaning] = useSound(`${URL}${audioMeaning}`, { interrupt: true })
  // const [speakExample] = useSound(`${URL}${audioExample}`, { interrupt: true })
  const [playSound] = useSound(audioSrc, { interrupt: true })

  const speakWord = () => {
    setAudioSrc(`${URL}${audio}`)
    playSound()
    console.log('audioSrc:', audioSrc)
  }

  const speakMeaning = () => {
    setAudioSrc(`${URL}${audioMeaning}`)
    playSound()
    console.log('audioSrc:', audioSrc)
  }

  const speakExample = () => {
    setAudioSrc(`${URL}${audioExample}`)
    playSound()
    console.log('audioSrc:', audioSrc)
  }

  return (
    <Grid item>
      <Paper elevation={3}>
        <Card variant="outlined" sx={{ display: 'flex', minWidth: '1000px', maxWidth: '1000px' }}>
          <Box>
            <CardMedia component="img" image={`${URL}${image}`} alt={word} />
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
  // const [speakWord] = useSound(`${URL}${word.audio}`)
  // const [speakMeaning] = useSound(`${URL}${word.audioMeaning}`)
  // const [speakExample] = useSound(`${URL}${word.audioExample}`)
  // return (
  //   <Grid item>
  //     <Paper elevation={3}>
  //       <Card variant="outlined" sx={{ display: 'flex' }}>
  //         <Box>
  //           <CardMedia component="img" image={`${URL}${word.image}`} alt={word.word} />
  //         </Box>
  //         <Box>
  //           <CardContent>
  //             <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
  //               <Typography variant="h4">
  //                 {word.word} : {word.transcription}
  //               </Typography>
  //               <IconButton aria-label="play/pause" onClick={speakWord}>
  //                 <RecordVoiceOverIcon sx={{ height: 38, width: 38 }} />
  //               </IconButton>
  //             </Box>
  //             <Typography variant="h6" color="text.secondary" gutterBottom>
  //               {word.wordTranslate}
  //             </Typography>
  //             <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'space-between' }}>
  //               <Typography>
  //                 <DangerousString name={word.textMeaning} />
  //               </Typography>
  //               <IconButton aria-label="play/pause" onClick={speakMeaning}>
  //                 <RecordVoiceOverIcon sx={{ height: 35, width: 35 }} />
  //               </IconButton>
  //             </Box>
  //             <Typography color="text.secondary">{word.textMeaningTranslate}</Typography>
  //             <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'space-between' }}>
  //               <Typography>
  //                 <DangerousString name={word.textExample} />
  //               </Typography>
  //               <IconButton aria-label="play/pause" onClick={speakExample}>
  //                 <RecordVoiceOverIcon sx={{ height: 35, width: 35 }} />
  //               </IconButton>
  //             </Box>
  //             <Typography color="text.secondary">{word.textExampleTranslate}</Typography>
  //           </CardContent>
  //         </Box>
  //       </Card>
  //     </Paper>
  //   </Grid>
  // )
}

export default WordCard
