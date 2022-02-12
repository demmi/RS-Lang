import React, { Suspense, useEffect, useState } from 'react'

import './TutorialPage.css'
import WordCard from '@/components/pages/TutorialPage/Card/wordCard'
import { Container, Grid } from '@mui/material'
import getWords from '@/components/api/getWords';
import { useSound } from 'use-sound';

function TutorialPage() {
  const [words, setWords] = useState(null);
  const [loaded, setLoaded] = useState(false);
  // const [audioSrc, setAudioSrc] = useState(null)
  const [audioSrc, setAudioSrc] = useSound(null)
  // const [audioSrc, setAudioSrc] = useState('http://localhost:5050/files/01_0002.mp3')
  const soundUrlTest = 'http://localhost:5050/files/01_0002_meaning.mp3';

  useEffect(() => {
    const loadData = async () => {
      const data = await getWords(0, 0);
      setWords(data);
      setLoaded(true);
    };
    loadData();
  }, []);

  const [playSound] = useSound(audioSrc, { interrupt: true })
  // const [playSound] = useSound(soundUrlTest, { interrupt: true })

  const setAudio = (word) => {
    setAudioSrc(word)
    playSound()
    console.log(`play word ${audioSrc}`, 'audioSrc=', audioSrc)
    // useSound(word)
    // const [speakWord] = useSound(word)
    // newSound(word)
  }




  return (
    <Container>
      <Grid container spacing={{ xs: 0, md: 1 }} justifyContent="space-evenly">
            {loaded
              ? words.map((el) => ( <WordCard data={el} key={el.id} /* setAudio={setAudio} /* playSound={playSound} */ /> ))
              : (<h3>Loading Data</h3>)}
      </Grid>
    </Container>
  );
}

export default TutorialPage
