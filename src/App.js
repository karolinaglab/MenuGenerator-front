import React, { Component } from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {Routing} from "./Routing";
import SignIn from "./components/SignIn"; 
import './App.css';

class App extends Component {

  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="App">
         <Router>
          <Routing/>
        </Router>
      </div>
    );
  }
}

export default App;
