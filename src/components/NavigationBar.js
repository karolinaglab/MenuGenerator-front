import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom';
import '../styles/NavigationBar.css';

class NavigationBar extends Component {

    handleLogoutButton = () => {
        localStorage.removeItem('accessToken');
        this.props.signOut();
        this.props.history.push("/")
    }

    render() {
        return (
            <div className="container-fluid">

                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="brand">Menu<span className="generator">Generator</span></div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" 
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/main">Strona główna</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/user">Profil</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/menulist">Jadłospisy</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/recipes">Przepisy</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/ingredients">Składniki</Link>
                            </li>
                            
                        </ul>                        
                        <button className="logout btn btn-outline-dark" onClick={this.handleLogoutButton}>Wyloguj się</button>                    
                    </div>
                </nav>

            </div>
        );
    }
}

export default withRouter (NavigationBar);