import React, { useState } from 'react'
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Slider,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const CommonMovies = () => {
  const [k, setK] = useState(2)
  const [testSize, setTestSize] = useState(20)
  const [accuracy, setAccuracy] = useState(0)

  const useStyles = makeStyles((theme) => ({
    slider: {
      width: '70%',
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

  const handleRunAlgorithm = () => {
    const requestOptions = {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        k_value: parseInt(k),
        test_size: testSize,
      })
    }
    fetch('/api/knn/user-based-common-movies/accuracy', requestOptions).then(response => {
      if (response.ok) {
        return response.json()
      }
    }).then(data => setAccuracy(data.accuracy))
  }
  const classes = useStyles();
  return (
    <Grid container spacing={3} align="center">
      <Grid item xs={12}>
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
      <Grid item xs={12}>
        <Typography variant="h6" component="h6">
          Accuracy: {accuracy.toString()}
          </Typography>
      </Grid>
    </Grid>
  )
}


export default CommonMovies