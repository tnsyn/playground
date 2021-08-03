import React from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Knn from './Knn'
import Eda from './Eda'
import Regression from './Regression'


const Home = () => {
  const renderHomePage = () => {
    return (
      <Grid container spacing={3} align="center">
        <Grid item xs={12}>
          <Typography variant="h1" component="h1">
            Playground
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="text" to="/eda" component={Link}>eda</Button>
          <Button variant="text" to="/knn" component={Link}>k-nearest neighbours</Button>
          <Button variant="text" to="/regression" component={Link}>regression</Button>
        </Grid>
      </Grid>
    )
  }
  return (
    <Router>
      <Switch>
        <Route path="/" exact>{renderHomePage()}</Route>
        <Route path="/eda" component={Eda} />
        <Route path="/knn" component={Knn} />
        <Route path="/regression" component={Regression} />
      </Switch>
    </Router>
  )
}

export default Home