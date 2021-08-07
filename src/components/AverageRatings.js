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
import { genres, marks } from '../constants'

const AverageRatings = () => {
    const [k, setK] = useState(2)
    const [trainSize, setTrainSize] = useState(80)
    const [sampleUser, setSampleUser] = useState()
    const [recommendations, setRecommendations] = useState([])

    const useStyles = makeStyles(() => ({
        slider: {
          width: '70%',
        },
        refresh: {
          cursor: "pointer",
          marginTop: "20px"
        },
        label: {
          margin: '0.8em',
        },
        margin: {
          marginBottom: '1em'
        }
      }));
    

      const handleRunAlgorithm = () => {
        let sampleRatings = []
        for (let i = 0; i < 19; i++) {
          sampleRatings.push(Math.floor(Math.random(0, 6) * 6))
        }
        const requestOptions = {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            k_value: k,
            train_size: trainSize,
            ratings: sampleRatings
          })
        }
        fetch('/api/knn/user-based-average-ratings', requestOptions).then(response => {
          if (response.ok) {
            return response.json()
          }
        }).then(data => {
          setRecommendations(data.movies)
          setSampleUser(sampleRatings)
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
          <Grid item xs={12}>
            <Slider
              className={classes.slider}
              onChange={(e, newVal) => setTrainSize(newVal)}
              defaultValue={trainSize}
              aria-labelledby="discrete-slider-custom"
              step={null}
              valueLabelDisplay="auto"
              marks={marks}
              />
            <FormHelperText align="center" className={classes.margin}>
              <div align="center">
                % of dataset used for training the model
              </div>
            </FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleRunAlgorithm}>Run algorithm</Button>
          </Grid>
          {sampleUser && (
            <Grid item xs={12}>
              <Typography align="left" className={classes.label} variant="h6" component="h6">
                <b>Sample user profile</b>
                <Tooltip placement="top" title='Generate again'>
                  <RefreshIcon className={classes.refresh} onClick={handleRunAlgorithm}/>
                </Tooltip>
              </Typography>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Genres</b>
                      </TableCell>
                      {genres.map(g => (
                        <TableCell>{g}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <b>Average Rating (out of 5)</b>
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
                Movie Recommendations: 
                <ul>
                  {recommendations.map(movie => (
                    <li>
                      <b>{movie}</b>
                    </li>
                  ))}
                </ul>       
              </Typography>
            </Grid>
          )}
      </Grid>
  </Grid>
)}

export default AverageRatings