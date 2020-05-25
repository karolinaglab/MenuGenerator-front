import React, { Component } from 'react';
import {Link} from "react-router-dom";
import API from '../axiosConfig';
import { withRouter } from 'react-router-dom';
import '../styles/MainPage.css';
import Menu from './Menu';

class MenuList extends Component {


    constructor(props){
        super(props);
        this.state={
            menus: [],
            recipeInfos: []
        }

        if(!localStorage.getItem('accessToken')) {
            this.props.history.push("/")
        }
    }

    componentDidMount() {
        API.get(`/menu`, {headers: {'Authorization': localStorage.getItem('accessToken')}})
          .then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({menus: res.data});
            
          })
          .catch((error) => {
              console.log(error);
          })
    }


    render() {
        console.log(this.state.menus);
        return (
            <div className="container">
                <h1>Twoje jadłospisy</h1>
                <ul className="list-group">
                    {this.state.menus.map(menu => 
                    <li className="list-group-item" key={menu.menuId}><Link to={`/menu/${menu.menuId}`}>{menu.menuDate}</Link></li>
                    )}
                </ul>
            </div>
            
        );
    }
}

export default withRouter (MenuList);