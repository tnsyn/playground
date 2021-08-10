const commonMovies = {
    'A': {
        movie: 'Forrest Gump (1994)'
    },
    'B': {
        movie: 'Shawshank Redemption, The (1994)'
    },
    'C': {
        movie: 'Pulp Fiction (1994)'
    },
    'D': {
        movie: 'Matrix, The (1999)'
    },
    'E': {
        movie: 'Silence of the Lambs, The (1991)'
    },
    'F': {
        movie: 'Star Wars: Episode IV - A New Hope (1977)'
    },
    'G': {
        movie: 'Braveheart (1995)'
    },
    'H': {
        movie: 'Jurassic Park (1993)'
    },
    'I': {
        movie: 'Schindler\'s List (1993)'
    },
    'J': {
        movie: 'American Beauty (1999)'
    },
    'K': {
        movie: 'Terminator 2: Judgment Day (1991)'
    },
    'L': {
        movie: 'Fight Club (1999)'
    },
    'M': {
        movie: 'Toy Story (1995)'
    },
    'N': {
        movie: 'Raiders of the Lost Ark (Indiana Jones and the Raiders of the Lost Ark) (1981)'
    },
    'O': {
        movie: 'Star Wars: Episode V - The Empire Strikes Back (1980)'
    }
}

const genres = [
    'Action',
    'Adventure',
    'Animation',
    'Children',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Fantasy',
    'Film Noir',
    'Horror',
    'IMAX',
    'Musical',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Thriller',
    'War',
    'Western'
]

const noOfRatings = [30635,24161,6988,9208,39053,16681,1219,41928,11834,870,7291,4145,4138,7674,18124,17243,26452,4859,1930]

const averageRatings = [
  3.45,
  3.51,
  3.63,
  3.41,
  3.38,
  3.66,
  3.80,
  3.66,
  3.49,
  3.92,
  3.26,
  3.62,
  3.56,
  3.63,
  3.51,
  3.46,
  3.49,
  3.81,
  3.58
]

const marks = [
    {
      value: 1,
      label: '1%',
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


module.exports = {
    commonMovies,
    genres,
    noOfRatings,
    averageRatings,
    marks
}