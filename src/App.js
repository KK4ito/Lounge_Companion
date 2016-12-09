import React, { Component } from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import { Tabs } from './components/Tabs';
import { Tab } from './components/Tab';
import logo from './logo.svg';
import './App.css';

import WhereAreWe from './pages/WhereAreWe';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Tabs selected={0}>
          <Tab label="Tab 1">
            <WhereAreWe name="David" />
          </Tab>
          <Tab label="Tab 2">
            <WhereAreWe name="Matthias" />
          </Tab>
          <Tab label="Tab 3">
            <WhereAreWe name="Kevin" />
          </Tab>
        </Tabs>
      </div>
    );
  }

  var
}

export default App;
