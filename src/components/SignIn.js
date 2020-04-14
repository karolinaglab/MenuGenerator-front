import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom';
import '../styles/SignIn.css';
import axios from 'axios'


class SignIn extends Component {


    constructor(props){
        super(props);
        this.state={
        usernameOrEmail:'',
        password:''
        }
    }

    handleUsernameOrEmailChange = event => {
        this.setState({ usernameOrEmail: event.target.value });
    }

    handlePasswordChange = event => {
        this.setState({ password: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
    
        const user = {
          usernameOrEmail: this.state.usernameOrEmail,
          password: this.state.password
        };
    
        axios.post(`http://localhost:8080/auth/signin`, user)
          .then(res => {
            console.log(res);
            console.log(res.data);
            this.props.history.push("/main")
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
                        <h1>Wtaj w kreatorze jadłospisów!</h1>
                        <h2>Zaloguj się</h2>
                        <form className="signin-form" onSubmit={this.handleSubmit}>
                            <div className="form-group input-form">
                                <input type="text" className="form-control" onChange={this.handleUsernameOrEmailChange} id="usernameOrEmail" placeholder="Email lub Nazwa Użytkownika*"/>
                            </div>
                            <div className="form-group input-form">
                                <input type="password" className="form-control" onChange={this.handlePasswordChange} id="password" placeholder="Hasło*"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Zaloguj się</button>
                        </form>
                        <Link to="/signup">Nie posiadasz jeszcze konta? Zarejestruj się!</Link>
                    </div>
                    <div className="col"> </div>
                </div>
            </div>
        );
    }
}

export default withRouter (SignIn);