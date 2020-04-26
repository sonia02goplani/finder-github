import React, { useState, Fragment } from "react";
import "./App.css";
import GithubState from "./context/Github/githubState";
import AlertState from "./context/Alert/alertState";
import Navbar from "./Components/layout/Navbar";
import Alert from "./Components/layout/Alert";
import User from "./Components/users/User";
import {Home} from "./pages/Home";
import {NotFound} from './pages/NotFound'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const App = () => {
  // async componentDidMount() {
  //   setState({ loading: true });
  //   const res = await axios.get(`https://api.github.com/users?client_id =${process.env.REACT_APP_GITHUB_CLIENTID}
  //     &client_secret=${process.env.REACT_APP_GITHUB_CLIENTSECRET}`);
  //   console.log(res.data);
  //   setState({ users: res.data, loading: false });
  // }

  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar title="GitHub Finder" icon="fas fa-user" />
            <Alert />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/user/:login" component={User} />
              <Route  component={NotFound} />

            </Switch>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
