import React, { Component } from 'react';
import './App.css';
import CountPanel from "./views/CountPanel";

class App extends Component {
  render() {
    return (
      <div className="App">
        <CountPanel />
      </div>
    );
  }
}

export default App;
