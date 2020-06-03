import React, { Component } from 'react';
import API from '../axiosConfig';
import { withRouter } from 'react-router-dom';
import '../styles/User.css';
import DataUpdateModal from './DataUpdateModal';

class User extends Component {


    constructor(props){
        super(props);
        this.state={
            user: '',
        
        }

        if(!localStorage.getItem('accessToken')) {
            this.props.history.push("/")
        }
    }

    componentDidMount() {
        this.fetchUserData();
    }


    fetchUserData = () => {
        API.get(`/user`, {headers: {'Authorization': localStorage.getItem('accessToken')}})
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({user: res.data});
          
        })
        .catch((error) => {
            console.log(error);
        })
    }



    render() {
        let genderMap = new Map();
        genderMap.set('FEMALE', 'kobieta');
        genderMap.set('MALE', 'mężczyzna');

        let activityMap = new Map();
        activityMap.set('NONE', 'brak');
        activityMap.set('LOW', 'niska');
        activityMap.set('AVERAGE', 'średnia');
        activityMap.set('HIGH', 'wysoka');
        activityMap.set('VERY_HIGH', 'bardzo wysoka');
        return (
            <div className="container">
                <div className="userContainer">
                    <h1>Witaj {this.state.user.username}!</h1>
                    <p><strong>E-mail: </strong>{this.state.user.email}</p>
                    <p><strong>Wiek: </strong>{this.state.user.age}</p>
                    <p><strong>Płeć: </strong>{genderMap.get(this.state.user.sex)}</p>
                    <p><strong>Masa ciała: </strong>{this.state.user.bodyWeight} kg</p>
                    <p><strong>Wzrost: </strong>{this.state.user.height} cm</p>
                    <p><strong>Aktywność fizyczna: </strong>{activityMap.get(this.state.user.activity)}</p>
                    <p><strong>Zapotrzebowanie energetyczne: </strong>{this.state.user.totalEnergyExpenditure} kcal</p>
                </div>
                <h3>Twoje BMI:</h3>
                <h2>{this.state.user.bmi}</h2>
                <h4>{this.state.user.message}</h4>
              
                <button type="button" className="btn btn-outline-secondary updatedataButton" data-toggle="modal" data-target="#updateDataModal">Zaktualizuj dane</button>

                <div className="modal fade" id="updateDataModal" tabIndex="-1" role="dialog" aria-labelledby="updateDataModal" aria-hidden="true">
                    
                    <DataUpdateModal user={this.state.user} fetchUserData={this.fetchUserData}></DataUpdateModal>
                </div>
            </div>
            
        );
    }
}

export default withRouter (User);