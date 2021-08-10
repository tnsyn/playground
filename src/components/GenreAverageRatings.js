import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Typography } from '@material-ui/core'
import { genres, averageRatings } from '../constants'

const GenreAverageRatings = () => {
  const state = {
    labels: genres,
    datasets: [
      {
        label: 'Average rating',
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
        data: averageRatings
      }
    ]
  }
  return (
    <div style={{width: '50%', height: '50%'}}>
      <Typography>
        Average ratings for each genre
      </Typography>
      <Bar 
        data={state}
        options={{
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false,
                min: 3,
                max: 5,
              },
            }]
          }
        }}
      />
    </div>
  )
}

export default GenreAverageRatings