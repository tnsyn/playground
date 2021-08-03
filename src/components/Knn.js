import React, { useState } from 'react'
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Link } from 'react-router-dom'

const Knn = () => {
  const [k, setK] = useState(2)
  const [accuracy, setAccuracy] = useState('')


  const handleSetK = () => {
    const requestOptions = {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        k_value: parseInt(k)
      })
    }
    fetch('/api/knn/k', requestOptions).then(response => {
      if (response.ok) {
        return response.json()
      }
    }).then(data => setAccuracy(data.accuracy))
  }

  return (
    <Grid container spacing={3} align="center">
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          Explore the MovieLens Dataset with the k-nearest neighbours algorithm!
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
        <Button variant="contained" color="primary" onClick={handleSetK}>Run algorithm</Button>
      </Grid>
      <Grid item xs={12}>
        {accuracy.toString()}
      </Grid>
      <Grid item xs={12}>
        <Button to='/' component={Link}><ArrowBackIcon /></Button>
      </Grid>
    </Grid>
  )
}


export default Knn