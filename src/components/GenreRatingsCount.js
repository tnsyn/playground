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
          'rgba(255, 99, 132, 0.4)',
          'rgba(255, 159, 64, 0.4)',
          'rgba(255, 205, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(201, 203, 207, 0.4)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        data: noOfRatings
      }
    ]
  }
  return (
    <div style={{width: '50%', height: '50%'}}>
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