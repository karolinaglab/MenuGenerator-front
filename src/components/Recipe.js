import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import API from '../axiosConfig';
import '../styles/Recipe.css';

class Recipe extends Component {

    constructor(props){
        super(props);
        this.state={
            ingredients: [],
            ingredient_infos: [],
            recipe: '',
            id: this.props.match.params.id,
            name: ''
        }


        if(!localStorage.getItem('accessToken')) {
            this.props.history.push("/")
        }
    }


    componentDidMount() {
        const id = this.state.id;

        API.get(`/recipe/${id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}})
          .then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({recipe: res.data});
            this.setState({ingredient_infos: res.data.ingredient_infos});
          })
          .catch((error) => {
              console.log(error);
          })
    }


    render() {
        var amountTypesMap = new Map();
        amountTypesMap.set('GRAMS', 'g');
        amountTypesMap.set('PIECES', 'szt.');
        return (
            <div>
                <h1 className="recipeTitle">{this.state.recipe.recipeName}</h1>
                <div className="container recipeContainer">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-md-5 col-bg-5 recipeDetails">
                            <h3>Jedna porcja zawiera {this.state.recipe.caloriesForPortion} kcal</h3>
                            <h3>Liczba porcji: {this.state.recipe.numberOfPortions}</h3>
                            <h2>Składniki</h2>
                            <ul className="list-group">
                                {this.state.ingredient_infos.map(ingredientinfo => 
                                    <li className="list-group-item" key={ingredientinfo.ingredient.id}><strong>{ingredientinfo.ingredient.ingrName}</strong>  {ingredientinfo.amount} {amountTypesMap.get(ingredientinfo.ingredient.amountType)}</li>)
                                }
                            </ul>
                            <div>
                                <h2>Wykonanie</h2>
                                <p className="recipeDescription">{this.state.recipe.description}</p>
                            </div>
                        </div>
                        <div className="col-md-5 col-bg-5">
                            <img className="recipe-img" src={this.state.recipe.src}/>
                        </div>
                        <div className="col"></div>

                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter (Recipe);