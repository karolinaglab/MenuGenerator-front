import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/SignIn.css';
import '../styles/IngredientsSearch.css';
import API from '../axiosConfig';

class IngredientsSearch extends Component {

    constructor(props){
        super(props);
        this.state={
            ingredients: [],
            name: ''
        }
        this.delay = undefined;

        if(!localStorage.getItem('accessToken')) {
            this.props.history.push("/")
        }
    }


    componentDidMount() {
        API.get(`/ingredient`, {headers: {'Authorization': localStorage.getItem('accessToken')}})
          .then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({ingredients: res.data});
          })
          .catch((error) => {
              console.log(error);
          })
    }


    handleChange = event => {
        this.setState({ name: event.target.value });
 
        if (this.delay) {
            clearTimeout(this.delay);
        }
        this.delay = setTimeout(() => {
            this.handleSubmit(event);
        }, 500);
    }

    handleSubmit = event => {
        event.preventDefault();
    
        const name = this.state.name;
    
        API.get(`/ingredients/?name=${name}`, {headers: {'Authorization': localStorage.getItem('accessToken')}})
          .then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({ingredients: res.data});
            this.setState({isError: false});
          })
          .catch((error) => {
              console.log(error);
          })
      }


    render() {
        return (
            <div>
                <h1>Lista składników wraz z ich kalorycznością</h1>

                <nav className="navbar navbar-light  ingredientNav">
                    <form className="form-inline" onSubmit={this.handleSubmit}>
                        <h4>Znajdź składnik w tabeli lub wyszukaj go</h4>  
                        <input className="form-control mr-sm-2" type="search" placeholder="Wyszukaj składnik" aria-label="Search" onChange={this.handleChange}/>
                        <button type="button" className="btn btn-outline-success my-2 my-sm-0" type="submit">Szukaj</button>
                    </form>
                </nav>

                <div className="container ingredientsContainer">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-sm-12 col-md-8">
                            <ul className="ingredientsList list-group">
                                {this.state.ingredients.map(ingredient => <li className="list-group-item" key={ingredient.id}><strong>{ingredient.name}</strong>  {ingredient.calories}</li>)}
                            </ul>
                        </div>
                        <div className="col"> </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter (IngredientsSearch);