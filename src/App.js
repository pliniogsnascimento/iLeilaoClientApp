import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import routes from 'routes/routes';
import Layout from 'components/Layout/Layout';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Layout>
            <Switch>
              {routes.map((rota, key) => {
                if(rota.redirect)
                  return <Redirect exact from={rota.from} to={rota.to} key={key} />

                if(rota.exact)
                  return <Route exact path={rota.path} component={rota.component} key={key} />
                
                return <Route path={rota.path} component={rota.component} key={key} />
              })}
            </Switch>
          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;
