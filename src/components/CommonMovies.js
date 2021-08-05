import React, { useState } from 'react'
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Slider,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Tooltip
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import RefreshIcon from '@material-ui/icons/Refresh';
import { commonMovies } from '../constants'

const CommonMovies = () => {
  const [k, setK] = useState(2)
  const [testSize, setTestSize] = useState(20)
  const [accuracy, setAccuracy] = useState(0)
  const [sampleUser, setSampleUser] = useState()
  const [predictedGenre, setPredictedGenre] = useState('')
  const [runAlgorithm, setRunAlgorithm] = useState(false)

  const useStyles = makeStyles(() => ({
    slider: {
      width: '70%',
    },
    ratings: {
      display: "flex",
      textAlign: "center"
    },
    style: {
      display: "flex"
    },
    cursor: {
      cursor: 'pointer'
    },
    refresh: {
      cursor: "pointer",
      marginTop: "20px"
    },
    label: {
      margin: '0.8em',
    }
  }));

  const marks = [
    {
      value: 0,
      label: '0%',
    },
    {
      value: 10,
      label: '10%',
    },
    {
      value: 20,
      label: '20%',
    },
    {
      value: 30,
      label: '30%',
    },
    {
      value: 40,
      label: '40%',
    },
    {
      value: 50,
      label: '50%',
    },
    {
      value: 60,
      label: '60%',
    },
    {
      value: 70,
      label: '70%',
    },
    {
      value: 80,
      label: '80%',
    },
    {
      value: 90,
      label: '90%',
    },
    {
      value: 99,
      label: '99%',
    },
  ];

  const generateAndPredictSampleUser = () => {
    let sampleRatings = []
    for (let i = 0; i < 15; i++) {
      sampleRatings.push(Math.floor(Math.random(0, 6) * 6))
    }
    const requestOptions = {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        k_value: k,
        test_size: testSize,
        ratings: sampleRatings
      })
    }
    fetch('/api/knn/user-based-common-movies/random-user', requestOptions).then(response => {
      if (response.ok) {
        return response.json()
      }
    }).then(data => {
      setSampleUser(sampleRatings)
      setPredictedGenre(data.genre)
    })
  }


  const handleRunAlgorithm = () => {
    let sampleRatings = []
    for (let i = 0; i < 15; i++) {
      sampleRatings.push(Math.floor(Math.random(0, 6) * 6))
    }
    const requestOptions = {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        k_value: k,
        test_size: testSize,
        ratings: sampleRatings
      })
    }
    fetch('/api/knn/user-based-common-movies', requestOptions).then(response => {
      if (response.ok) {
        return response.json()
      }
    }).then(data => {
      setAccuracy(data.accuracy)
      setSampleUser(sampleRatings)
      setPredictedGenre(data.genre)
      setRunAlgorithm(true)
    })
  }
  const classes = useStyles();
  return (
    <Grid container spacing={2} align="center">
      <Grid item xs={12}>
        <Typography variant="h6" component="h6">
          <b>Configure model settings</b>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl>
          <TextField
            required={true}
            defaultValue={k}
            onChange={e => setK(e.target.value)}
            type="number"
            inputProps={{
              min: 1,
              style: {textAlign: "center"}
            }}
          />    
          <FormHelperText>
            <div align="center">
              Value of K
            </div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Slider
          className={classes.slider}
          onChange={(e, newVal) => setTestSize(newVal)}
          defaultValue={testSize}
          aria-labelledby="discrete-slider-custom"
          step={null}
          valueLabelDisplay="auto"
          marks={marks}
        />
        <FormHelperText align="center">
          <div align="center">
            Percentage of dataset used for testing
          </div>
        </FormHelperText>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleRunAlgorithm}>Run algorithm</Button>
      </Grid>
      {runAlgorithm && (
        <Grid item xs={12}>
          <hr />
          <Typography className={classes.label} align="left" variant="h6" component="h6">
            <b>Model Statistics</b>
          </Typography>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    Accuracy
                  </TableCell>
                  <TableCell>
                    {accuracy.toString()}
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Grid>
      )}
      {sampleUser && (
        <Grid item xs={12}>
          <Typography align="left" className={classes.label} variant="h6" component="h6">
            <b>Sample user profile</b>
            <Tooltip placement="top" title='Generate again'>
              <RefreshIcon className={classes.refresh} onClick={generateAndPredictSampleUser}/>
            </Tooltip>
          </Typography>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Common Movies</b>
                  </TableCell>
                  {Object.entries(commonMovies).map(([id, movie]) => (
                    <Tooltip title={movie.movie} placement="top" className={classes.cursor}>
                      <TableCell>{id}</TableCell>
                    </Tooltip>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>Rating (out of 5)</b>
                  </TableCell>
                {sampleUser.map(rating => (
                  <TableCell component="th" scope="row">
                    {rating.toString()}
                  </TableCell>
                ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography align="left" className={classes.label} variant="h6" component="h6">
            Predicted favourite genre: <b>{predictedGenre}</b>
          </Typography>
        </Grid>
      )}
    </Grid>
  )}


export default CommonMovies