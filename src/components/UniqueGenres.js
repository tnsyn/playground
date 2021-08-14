import React from 'react'
import {
  Grid,
  Typography,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { genres } from '../constants'


const UniqueGenres = () => {
  const useStyles = makeStyles(() => ({
    container: {
      margin: "0 auto",
      width: '50%'
    },
    genre: {
      fontFamily: "Calligraphy",
      fontSize: '5.5vh',
      textTransform: 'lowercase',
      letterSpacing: '-3px',
      margin: '-0.3em',
      padding: 0,
      height: '100%',
      '&:hover': {
        background: 'none!important'
      }
    },
    text: {
      marginBottom: '25px'
    }
  }))
  const classes = useStyles()
  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} className={classes.text}>
        <Typography>
          Unique Genres
        </Typography>
      </Grid>
        {genres.map(g => (
          <Grid item xs={12} sm={6}>
            <Button className={classes.genre}>
              {g}
            </Button>
          </Grid>
        ))}
    </Grid>
  )
}

export default UniqueGenres