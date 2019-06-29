import React from 'react';
import './App.css';
import ServerStats from './ServerStats';

export default class App extends React.Component {
  render() {
    return (<div className="App">
      <header>
        <ServerStats/>
      </header>
    </div>);
  }
}
