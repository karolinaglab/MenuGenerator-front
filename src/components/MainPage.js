import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom';
import API from '../axiosConfig';
import '../styles/MainPage.css';
import Menu from './Menu';

class MainPage extends Component {


    constructor(props){
        super(props);
        this.state={
            recipeInfos: [],
            foundMenu: ''
        }

        if(!localStorage.getItem('accessToken')) {
            this.props.history.push("/")
        }
    }

    componentDidMount() {
        API.get(`/todaymenu`, {headers: {'Authorization': localStorage.getItem('accessToken')}})
          .then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({recipeInfos: res.data});
            this.setState({foundMenu: true});
          })
          .catch((error) => {
            this.setState({foundMenu: false});
            console.log(error);
          })
    }

    handleCreateMenuButton = event => {
        this.props.history.push("/recipes");
    }

    render() {
        return (
            <div>
                {this.state.foundMenu && 
                    <Menu recipeInfos={this.state.recipeInfos}></Menu> 
                }
                {!this.state.foundMenu && 
                <div className="container menuContainer">
                    <h1>Nie wygenerowano jadłospisu na dzisiejszy dzień</h1>
                </div>
                }
                <button type="button" className="btn btn-outline-secondary btn-lg createMenuButton" onClick={this.handleCreateMenuButton}>Stwórz nowy jadłospis</button>
            </div>
        );
    }
}

export default withRouter (MainPage);