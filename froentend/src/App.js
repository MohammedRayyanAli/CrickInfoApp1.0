import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Css Style
import './App.css';

//Import Custom Components
import CreatePlayer from './components/CreatePlayer';
import ShowPlayerList from './components/ShowPlayerList';

class App extends Component {
  render() {
    return (
      //Routers
      <Router>
        <div>
          <div className="topnav">
            <a className="active" href="#crickinfo">CrickInfo</a>
            <a href="/create-player">AddPlayer</a>
            <a href="/">Players List</a>
          </div>
          <Route exact path='/' component={ShowPlayerList} />
          <Route path='/create-player' component={CreatePlayer} />
        </div>
      </Router>
    );
  }
}
let rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;