import React from 'react'

import './TutorialPage.css'
import WordCard from '@/components/pages/TutorialPage/Card/wordCard'
import { Container, Grid } from '@mui/material'

function TutorialPage() {
  return (
    <Container>
      <Grid container spacing={{ xs: 0, md: 1 }} justifyContent="space-evenly">
        <WordCard />
        <WordCard />
        <WordCard />
        <WordCard />
        <WordCard />
        <WordCard />
        <WordCard />
        <WordCard />
        <WordCard />
        <WordCard />
        <WordCard />
        <WordCard />
        <WordCard />
        <WordCard />
        <WordCard />
        <WordCard />
        <WordCard />
        <WordCard />
        <WordCard />
        <WordCard />
      </Grid>
    </Container>
  )
}

export default TutorialPage
