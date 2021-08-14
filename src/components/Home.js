import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Knn from './Knn'
import Eda from './Eda'
import Regression from './Regression'
import { makeStyles } from '@material-ui/core/styles';
import { Fade } from 'react-reveal'


const Home = () => {
  const useStyles = makeStyles(() => ({
    title: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    image: {
      width: '70%',
      marginLeft: '1em',
    },
    text: {
      fontFamily: "Calligraphy",
      fontSize: '16vw'
    }
  }))
  const classes = useStyles()
  const renderHomePage = () => {
    return (
      <Grid container spacing={3} align="center" className={classes.title}>
        <Grid item xs={12} className={classes.playground}>
          <Fade bottom>
            <div className={classes.text}>
              playground
            </div>
          </Fade>
        </Grid>
        <Grid item xs={12}>
          <Fade bottom>
            <Button variant="text" to="/eda" component={Link}>eda</Button>
            <Button variant="text" to="/knn" component={Link}>k-nearest neighbours</Button>
            <Button variant="text" to="/regression" component={Link}>regression</Button>
          </Fade>
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