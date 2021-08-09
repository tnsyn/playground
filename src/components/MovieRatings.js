import React, { useState, useEffect } from 'react'
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Tooltip
} from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/core/styles';

const MovieRatings = () => {
    const [noOfRecommendations, setNoOfRecommendations] = useState(10)
    const [givenMovie, setGivenMovie] = useState('')
    const [recommendations, setRecommendations] = useState([])
    const [runAlgorithm, setRunAlgorithm] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const useStyles = makeStyles(() => ({
      refresh: {
        cursor: "pointer"
      },
      movieText: {
        width: "40%"
      }
    }));
  

    const getRandomMovie = () => {
      const requestOptions = {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
      }
      fetch('api/knn/item-based-movie-ratings/random-movie', requestOptions).then(response => {
        if (response.ok) {
          return response.json()
        }
      }).then(data => {
        setGivenMovie(data.movie)
      })
    }

    useEffect(() => {
      getRandomMovie()
    }, [])
  
    const handleRunAlgorithm = () => {
      const requestOptions = {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          no_of_recommendations: noOfRecommendations,
          given_movie: givenMovie
        })
      }
      fetch('/api/knn/item-based-movie-ratings', requestOptions).then(response => {
        if (response.ok) {
          return response.json()
        }
      }).then(data => {
        setRecommendations(data.movies)
        setRunAlgorithm(true)
        setErrorMsg('')
      }).catch(err => {
        setErrorMsg('Movie not found in database!')
        setRunAlgorithm(false)
      })
    }

    const classes = useStyles()
    
    return (
      <Grid container spacing={2} align="center">
        <Grid item xs={12}>
          <Typography variant="h6" component="h6">
            <b>Configure model settings</b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.movieText}>
            <TextField
              required={true}
              value={givenMovie}
              onChange={e => setGivenMovie(e.target.value)}
              inputProps={{
                style: {
                  textAlign: "center"
                },
              }}
            /> 
            <FormHelperText>
              <div align="center">
                Movie
              </div>
            </FormHelperText>
          </FormControl>
          <Tooltip title="Generate another movie" placement='top'>
            <RefreshIcon className={classes.refresh} onClick={getRandomMovie}/>
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <TextField
              required={true}
              defaultValue={noOfRecommendations}
              onChange={e => setNoOfRecommendations(e.target.value)}
              type="number"
              inputProps={{
                min: 1,
                style: {textAlign: "center"}
              }}
            />    
            <FormHelperText>
              <div align="center">
                Number of movies to recommend
              </div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleRunAlgorithm}>Run algorithm</Button>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center" variant="h6" component="h6" color="error">
            {errorMsg}
          </Typography>
        </Grid>
        {runAlgorithm && (
          <Typography align="left" variant="h6" component="h6">
            Movie Recommendations: 
            <ul>
              {recommendations.map(movie => (
                <li>
                  <b>{movie}</b>
                </li>
              ))}
            </ul>       
          </Typography>
      )}
  </Grid>
)}

export default MovieRatings