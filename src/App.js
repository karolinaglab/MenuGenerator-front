import React, { Component } from 'react';

import SignIn from "./components/SignIn";
import './App.css';
import NavigationBar from './components/NavigationBar';
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import MainPage from './components/MainPage';
import SignUp from './components/SignUp';
import IngredientsSearch from './components/IngredientsSearch';
import RecipesList from './components/RecipesList';
import Recipe from './components/Recipe';
import MenuCreator from './components/MenuCreator';
import MenuList from './components/MenuList';
import ChosenMenu from './components/ChosenMenu';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogged: false
    }
  }

  signIn = () => {
    this.setState({isLogged: true});
  }

  signOut = () => {
    this.setState({isLogged: false})
  }

  componentDidMount() {
    if(localStorage.getItem('accessToken')) {
      this.setState({ isLogged: true })
      this.props.history.replace("/main")
    }
  }

  render() {
    return (
      <div className="App">
         {this.state.isLogged &&  <NavigationBar signOut={this.signOut}></NavigationBar>}
         <Switch>
          <Route exact path="/">
            <SignIn signIn={this.signIn} />
          </Route>
          <Route exact path="/main">
            <MainPage />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/ingredients">
            <IngredientsSearch />
          </Route>
          <Route exact path="/recipes">
            <RecipesList />
          </Route>
          <Route exact path="/recipe/:id">
            <Recipe />
          </Route>
          <Route exact path="/createmenu">
            <MenuCreator />
          </Route>
          <Route exact path="/menulist">
            <MenuList />
          </Route>
          <Route exact path="/menu/:id">
            <ChosenMenu />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
