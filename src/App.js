import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from 'components/Layout/Layout';
import CssBaseline from '@material-ui/core/CssBaseline';
import {connect} from 'react-redux';

import Login from 'views/Login/Login';
import Leilao from 'views/Leilao/Leilao';
import Produto from 'views/Produto/Produto';
import Register from 'views/Register/Register';

class App extends Component {

  state = {
    menuOpen: false,
    userMenuOpen: false
  }

  menuStatusChanged = () => {
    this.setState({menuOpen: !this.state.menuOpen});
  }

  userMenuStatusChanged = () => {
    this.setState({menuOpen: !this.state.userMenuOpen});
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <CssBaseline />
          <Layout menuOpen={this.state.menuOpen}
            menuStatusChanged={this.menuStatusChanged}
            user={this.props.user}>
            <Switch>
              <Route path="/leilao" component={Leilao} />
              <Route path="/" component={Login} />
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps)(App);
