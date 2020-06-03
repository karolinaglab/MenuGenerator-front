import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import API from '../axiosConfig';
import '../styles/MainPage.css';

class DataUpdateModal extends Component {


    constructor(props){
        super(props);
        this.state={
            isError: false,
          ...this.props.user

        }

        if(!localStorage.getItem('accessToken')) {
            this.props.history.push("/")
        }
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }


    userDataUpdate = event => {
        event.preventDefault();

        const user = {
            height: this.state.height,
            bodyWeight: this.state.bodyWeight,
            age: this.state.age,
            activity: this.state.activity,
            sex: this.state.sex
        }
        API.put(`/user`, user, {headers: {'Authorization': localStorage.getItem('accessToken')}})
          .then(res => {
            console.log(res);
            console.log(res.data);
            this.props.fetchUserData();
            this.setState({isError: false});
          })
          .catch((error) => {
              this.setState({isError: true});
              console.log(error);
          })
    }


    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            this.setState({...this.props.user});
        }
    }

    render() {
        return (
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="updateDataModal">Wpisz nowe dane</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.userDataUpdate}>
                                    <div className="form-group input-form">
                                        <input type="number" className="form-control" name="height" defaultValue={this.state.height} onChange={this.handleChange} id="height" placeholder="Wysokość w cm*"/>
                                    </div>
                                    <div className="form-group input-form">
                                        <input type="number" className="form-control" name="bodyWeight" defaultValue={this.state.bodyWeight} onChange={this.handleChange} id="bodyWeight" placeholder="Masa ciała w kg*"/>
                                    </div>
                                    <div className="form-group input-form">
                                        <input type="number" className="form-control" defaultValue={this.state.age} onChange={this.handleChange} name="age" id="age" placeholder="Wiek*"/>
                                    </div>
                                    <div className="form-group">
                                        <select className="form-control" name="sex" defaultValue={this.state.sex} onChange={this.handleChange} id="sex">
                                            <option value="FEMALE">Kobieta</option>
                                            <option value="MALE">Mężczyzna</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <select className="form-control" name="activity" defaultValue={this.state.activity} onChange={this.handleChange} id="activity">
                                            <option value="NONE">Brak</option>
                                            <option value="LOW">Niski</option>
                                            <option value="AVERAGE">Średni</option>
                                            <option value="HIGH">Wysoki</option>
                                            <option value="VERY_HIGH">Bardzo wysoki</option>
                                        </select>
                                    </div>
                                    {this.state.isError &&<div className="error">Wszystkie pola muszą być wypełnione!</div>}
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Zamknij</button>
                                        <button type="submit" className="btn btn-primary">Zapisz zmiany</button>
                                    </div>
                                </form>
                        </div>
                    
                    </div>
            </div>
        );
    }
}

export default withRouter (DataUpdateModal);