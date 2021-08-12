import React from 'react'
import {
  Grid,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const UniqueGenres = () => {
  const useStyles = makeStyles(() => ({
    imageContainer: {
      margin: "0 auto"
    },
    image: {
      width: '30%',
      height: '30%'
    }
  }))
  const classes = useStyles()
  return (
    <Grid item xs={12} className={classes.imageContainer}>
      <Typography>
        Unique Genres
      </Typography>
      <img className={classes.image} src='/art.jpg' alt='genres'></img>
    </Grid>
  )
}

export default UniqueGenres