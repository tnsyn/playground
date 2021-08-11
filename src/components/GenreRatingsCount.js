import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Typography } from '@material-ui/core'
import { genres, noOfRatings } from '../constants'

const GenreRatingsCount = () => {
  const state = {
    labels: genres,
    datasets: [
      {
        label: 'Rating count',
        backgroundColor: [
          'rgba(85, 144, 155, 0.5)',
        ],
        borderColor: [
          'rgb(85, 144, 155)'
        ],
        data: noOfRatings
      }
    ]
  }
  return (
    <div style={{width: '40%'}}>
      <Typography>
        Number of ratings per genre
      </Typography>
      <Bar 
        data={state}
      />
    </div>
  )
}

export default GenreRatingsCount