import React from 'react'
import CommonMovies from './CommonMovies'
import AverageRatings from './AverageRatings'
import MovieRatings from './MovieRatings'
import {
  Button,
  Grid,
  Typography,
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Fade } from 'react-reveal'

const Knn = () => {
  const useStyles = makeStyles((theme) => ({
    accordion: {
      width: '85%',
      margin: '0 auto'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      margin: '0 auto'
    },
    root: {
      marginTop: "5em"
    }
  }));
  const classes = useStyles();

  return (
    <Grid container spacing={3} align="center" className={classes.root}>
      <Grid item xs={12}>
        <Fade bottom>
          <Typography variant="h4" component="h4">
            Explore the MovieLens Dataset with the k-nearest neighbours algorithm!
          </Typography>
        </Fade>
      </Grid>
      <Grid item xs={12}>
      </Grid>
      <Fade bottom>
        <div className={classes.accordion}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                User-based Collaborative Filtering:
                Using ratings of common movies across users to determine user similarity
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CommonMovies />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                User-based Collaborative Filtering:
                Using average rating of each genre to determine user similarity
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <AverageRatings />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                Item-based Collaborative Filtering:
                Using ratings for each movie to determine movie similarity
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <MovieRatings />
            </AccordionDetails>
          </Accordion>
        </div>
      </Fade>
      <Grid item xs={12}>
        <Button to='/' component={Link}><ArrowBackIcon /></Button>    
      </Grid>
    </Grid>
  )
}

export default Knn