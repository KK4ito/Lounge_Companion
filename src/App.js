import React, { Component } from 'react';
import { Tabs } from './components/Tabs';
import { Tab } from './components/Tab';

import logo from './beer_white.png';
import './App.css';

import WhereAreWe from './pages/WhereAreWe';
import Home from './pages/Home';
import Drinks from './pages/Drinks';
import Game from './pages/Game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Lounge Companion</h1>
        </div>
        <div className="container-fluid">
        <Tabs selected={0} >
          <Tab label="Home">
            <div className="content" ><Home /></div>
          </Tab>
          <Tab label="Drinks">
            <div className="content" ><Drinks /></div>
          </Tab>
          <Tab label="Toeggele">
            <div className="content" ><Game /></div>
          </Tab>
          <Tab label="Map">
            <WhereAreWe />
          </Tab>
        </Tabs>
        </div>
      </div>
    );
  }
}

export default App;
