import React, { useContext } from 'react'

import './TutorialChoice.css'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import IsLogged, { Category, PageRouter } from '@/components/context'
import imgCat1 from '@/assets/images/001.jpg'
import imgCat2 from '@/assets/images/002.jpg'
import imgCat3 from '@/assets/images/003.jpg'
import imgCat4 from '@/assets/images/004.jpg'
import imgCat5 from '@/assets/images/005.jpg'
import imgCat6 from '@/assets/images/006.jpg'
import imgCat7 from '@/assets/images/007.jpg'
import { PAGE_OF_CATEGORIES, TUTORIAL_PAGE } from '@/components/const'

function TutorialChoice() {
  const { isLogged } = useContext(IsLogged)
  const { setCategory } = useContext(Category)
  const { setRouterPage } = useContext(PageRouter)
  const imgCatArr = [imgCat1, imgCat2, imgCat3, imgCat4, imgCat5, imgCat6, imgCat7]

  const handleClickCategory = event => {
    setCategory(+event.currentTarget.dataset.id)
    setRouterPage(TUTORIAL_PAGE)
  }

  return (
    <div className="tutorial-choice">
      {PAGE_OF_CATEGORIES.map(el => (
        <Card sx={{ maxWidth: 300, margin: '20px' }} key={el.id}>
          <CardActionArea disabled={!isLogged && !el.access} onClick={handleClickCategory} data-id={el.id}>
            <CardMedia component="img" height="140" image={imgCatArr[el.id]} alt="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {el.title.toUpperCase()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {el.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  )
}

export default TutorialChoice
