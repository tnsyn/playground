import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Typography } from '@material-ui/core'
import { genres, averageRatings } from '../constants'

const GenreAverageRatings = () => {
  const state = {
    labels: genres,
    datasets: [
      {
        type: 'bar',
        label: 'Average rating',
        backgroundColor: [
         'rgba(205, 92, 69, 0.5)',
        ],
        borderColor: [
          'rgb(205, 92, 69)',
        ],
        data: averageRatings
      }
    ]
  }
  return (
    <div style={{width: '40%'}}>
      <Typography>
        Average ratings for each genre
      </Typography>
       <Bar 
        data={state}
        options={{
          scales: {
            yAxes: {
              max: 5,
              min: 2
            }
          }
        }}
      />
    </div>
  )
}

export default GenreAverageRatings