import React, { useEffect } from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { makeStyles } from '@mui/styles'
import { Grid } from '@mui/material'

const MAX_LIVES_COUNT = 5

const useStyles = makeStyles({
  container: {
    '& svg': {
      color: '#e45731',
    },
  },
})

function Lives(props) {
  const { livesCount, gameOver } = props
  const classes = useStyles()

  useEffect(() => {
    if (livesCount <= 0) {
      gameOver()
    }
  }, [gameOver, livesCount])

  return (
    <Grid container justifyContent="center" alignItems="center" className={classes.container}>
      {new Array(livesCount).fill(1).map((item, index) => (
        <FavoriteIcon key={`active-${index}`} />
      ))}
      {new Array(MAX_LIVES_COUNT - livesCount).fill(1).map((item, index) => (
        <FavoriteBorderIcon key={`inactive-${index}`} />
      ))}
    </Grid>
  )
}

export default Lives
