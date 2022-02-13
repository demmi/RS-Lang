import React, { useEffect, useState, useRef, useContext } from 'react'

import './TutorialPage.css'
import WordCard from '@/components/pages/TutorialPage/Card/wordCard'
import { Stack } from '@mui/material'
import getWords from '@/components/api/getWords';
import { Category, Page } from '@/components/context';
import TutorialPagination from './TutorialPagination/TutorialPagination';
import PageOfCategories from './PageOfCategories/PageOfCategories';

function TutorialPage() {
  const [words, setWords] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [audioSrc, setAudio] = useState(null)
  const { category } = useContext(Category)
  const { page } = useContext(Page)

  const audioRef = useRef(new Audio(audioSrc))

  useEffect(() => {
    audioRef.current.pause()
    audioRef.current = new Audio(audioSrc)
    audioRef.current.play()
  }, [audioSrc])

  useEffect(() => {
    const loadData = async () => {
      const data = await getWords(category - 1, page - 1);
      setWords(data);
      setLoaded(true);
    };
    loadData();
  }, [category, page]);

  return (
    <div className="tutorial-category">
      <Stack spacing={2} sx={{ position: 'fixed', top: 85, left: 8, height: '81%', justifyContent: 'space-between' }} >
        <PageOfCategories />
        <TutorialPagination sx={{ marginTop: '50px' }} />
      </Stack>
      <div className="empty-space"> </div>
      <div className="tutorial-content">
        <Stack spacing={2}>
              {loaded
                ? words.map((el) => ( <WordCard data={el} key={el.id} setAudio={setAudio} /> ))
                : (<h3>Loading Data</h3>)}
        </Stack>
      </div>
    </div>
  );
}

export default TutorialPage
