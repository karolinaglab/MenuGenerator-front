import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import API from '../axiosConfig';
import '../styles/MainPage.css';
import Menu from './Menu';

class ChosenMenu extends Component {


    constructor(props){
        super(props);
        this.state={
            menus: [],
            id: this.props.match.params.id
        }

        if(!localStorage.getItem('accessToken')) {
            this.props.history.push("/")
        }
    }

    componentDidMount() {
        const id = this.state.id;
        API.get(`/menu/${id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}})
          .then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({
                menus: res.data,
                foundMenu: true
            });
          })
          .catch((error) => {
            this.setState({foundMenu: false});
            console.log(error);
          })
    }


    render() {
        return (
            <div>
                {this.state.menus.map((menu, index) => 
                            <Menu key={index} recipeInfos={menu}></Menu>  
                )}
            </div>
        );
    }
}

export default withRouter (ChosenMenu);