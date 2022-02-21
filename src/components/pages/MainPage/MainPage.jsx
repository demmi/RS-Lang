import React, { useState } from 'react';

import './MainPage.css';
import { Card, CardActionArea, CardContent, Typography, Grid, Box, Paper } from '@mui/material';
import { MAIN_PAGE_SECTIONS } from '@/components/const';

function DangerousString({ name }) {
  return <span dangerouslySetInnerHTML={{ __html: name }} />
}

function MainPage() {
  const [id, setId] = useState(0)

  const handleClickSection = (event) => {
    const section = event.currentTarget.dataset.id
    setId(section)
  }

  return (
    <Grid container direction="row" justifyContent='left' alignItems="center" spacing={8}>
      <Grid item >
        {MAIN_PAGE_SECTIONS.map((el) => (
          <Paper elevation={5} sx={{ maxWidth: 300, margin: '20px' }} >
            <Card key={el.id} >
              <CardActionArea onClick={handleClickSection} data-id={el.id} >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {el.title.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {el.shortDescription}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Paper>
        ))}
      </Grid>

      <Grid item alignItems="top" sx={{ maxWidth: '600px'}}>
        <Box >
          <Typography gutterBottom variant="h5" component="div">
            {MAIN_PAGE_SECTIONS[id].title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <DangerousString name={MAIN_PAGE_SECTIONS[id].fullDescription} />
          </Typography>
        </Box>
      </Grid>
    </Grid>

  );
};

export default MainPage;