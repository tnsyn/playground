import React from 'react'
import { Link } from 'react-router-dom'
import {
  Grid,
  Typography,
  Button
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { makeStyles } from '@material-ui/core/styles'
import { Fade } from 'react-reveal';
import GenreRatingsCount from './GenreRatingsCount'
import GenreAverageRatings from './GenreAverageRatings'
import UniqueGenres from './UniqueGenres'

const Eda = () => {
  const useStyles = makeStyles(() => ({
    title: {
      marginTop: '5em',
      marginBottom: '1em'
    },
    charts: {
      display: 'flex',
      marginLeft: '10%',
      marginRight: '10%',
      justifyContent: "space-around",
      flex: 'wrap'
    }
  }))
  const classes = useStyles()
  return (
    <Grid container spacing={3} align="center">
      <Grid item xs={12} className={classes.title}>
        <Fade bottom>
          <Typography variant="h4" component="h4">
            Gleaming insights from the MovieLens Dataset!
          </Typography>
          </Fade>
      </Grid>
      <Grid item xs={12}>
        <Fade bottom>
          <UniqueGenres />
        </Fade>
      </Grid>
      <Grid item xs={12}>
        <Fade bottom>
          <GenreRatingsCount />
        </Fade>
      </Grid>
      <Grid item xs={12}>
        <Fade bottom>
          <GenreAverageRatings />
        </Fade>
      </Grid>
      <Grid item xs={12}>
        <Button to='/' component={Link}><ArrowBackIcon /></Button>
      </Grid>
    </Grid>
  )
}


export default Eda