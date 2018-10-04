import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete'
// import routes 

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Button variant="contained" color="primary">
            Hello World
          </Button>
          <Delete />
        </div>
      </Router>
    );
  }
}

export default App;
