import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import API from '../axiosConfig';
import NavigationBar from './NavigationBar';

class MainPage extends Component {


    constructor(props){
        super(props);
        this.state={

        }

        if(!localStorage.getItem('accessToken')) {
            this.props.history.push("/")
        }
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

export default withRouter (MainPage);