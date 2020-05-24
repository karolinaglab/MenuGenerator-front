import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom';
import '../styles/NavigationBar.css';

class NavigationBar extends Component {


    constructor(props){
        super(props);
        this.state={

        }
    }

    handleLogoutButton = event => {
        localStorage.removeItem('accessToken');
        this.props.signOut();
        this.props.history.push("/")
    }

    render() {
        return (
            <div>
                <nav className="navbar">
                    <ul className="topnav">
                        <div className="brand">Menu<span className="generator">Generator</span></div>
                        <li><Link className="nav-link" to="/main">Strona główna</Link></li>
                        <li><Link className="nav-link" to="/main">Profil</Link></li>
                        <li><Link className="nav-link" to="/main">Jadłospisy</Link></li>
                        <li><Link className="nav-link" to="/recipes">Przepisy</Link></li>
                        <li><Link className="nav-link" to="/ingredients">Składniki</Link></li>
                        <button className="logout btn btn-outline-dark" onClick={this.handleLogoutButton}>Wyloguj się</button>
                    </ul>
                </nav>

            </div>
        );
    }
}

export default withRouter (NavigationBar);