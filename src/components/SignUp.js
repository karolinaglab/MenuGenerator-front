import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom';
import axios from 'axios'

class SignUp extends Component {

    constructor(props){
        super(props);
        this.state={
        username:'',
        email:'',
        password:'',
        height:'',
        bodyWeight:'',
        age:'',
        activity:'',
        sex:''
        }
    }


    handleUsernameChange = event => {
        this.setState({ username: event.target.value });
    }

    handleEmailChange = event => {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange = event => {
        this.setState({ password: event.target.value });
    }

    handleHeightChange = event => {
        this.setState({ height: event.target.value });
    }

    handleWeightChange = event => {
        this.setState({ bodyWeight: event.target.value });
    }

    handleAgeChange = event => {
        this.setState({ age: event.target.value });
    }

    handleSexChange = event => {
        this.setState({ sex: event.target.value });
    }

    handleActivityChange = event => {
        this.setState({ activity: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
    
        const user = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          height: this.state.height,
          bodyWeight: this.state.bodyWeight,
          age: this.state.age,
          activity: this.state.activity,
          sex: this.state.sex
        };
    
        axios.post(`http://localhost:8080/auth/signup`, user)
          .then(res => {
            console.log(res);
            console.log(res.data);
            this.props.history.push("/")
          })
          .catch((error) => {
            console.log(error);
        })
      }

    render() {
        return (
            <div className="container signinup-container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col-sm-12 col-md-8">
                        <h1>Zarejestruj się</h1>
                        <form className="signin-form" onSubmit={this.handleSubmit}>
                            <div className="form-group input-form">
                                <input type="text" className="form-control" onChange={this.handleUsernameChange} id="username" placeholder="Nazwa użytkownika*"/>
                            </div>
                            <div className="form-group input-form">
                                <input type="text" className="form-control" onChange={this.handleEmailChange} id="email" placeholder="Email*"/>
                            </div>
                            <div className="form-group input-form">
                                <input type="password" className="form-control" onChange={this.handlePasswordChange} id="password" placeholder="Hasło*"/>
                            </div>
                            <div className="form-group input-form">
                                <input type="text" className="form-control" onChange={this.handleHeightChange} id="height" placeholder="Wysokość w cm*"/>
                            </div>
                            <div className="form-group input-form">
                                <input type="text" className="form-control" onChange={this.handleWeightChange} id="bodyWeight" placeholder="Masa ciała w kg*"/>
                            </div>
                            <div className="form-group input-form">
                                <input type="text" className="form-control" onChange={this.handleAgeChange} id="age" placeholder="Wiek*"/>
                            </div>
                            <div className="form-group">
                                <select className="form-control" value={this.state.sex} onChange={this.handleSexChange} id="sex">
                                    <option value="FEMALE">Kobieta</option>
                                    <option value="MALE">Mężczyzna</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <select className="form-control" value={this.state.activity} onChange={this.handleActivityChange} id="activity">
                                    <option value="NONE">Brak</option>
                                    <option value="LOW">Niski</option>
                                    <option value="AVERAGE">Średni</option>
                                    <option value="HIGH">Wysoki</option>
                                    <option value="VERY_HIGHE">Bardzo wysoki</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </form>
                    </div>
                    <div className="col"> </div>
                </div>
            </div>
        );
    }
}

export default withRouter (SignUp);