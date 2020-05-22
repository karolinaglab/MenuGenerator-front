import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom';
import API from '../axiosConfig';
import '../styles/RecipeList.css';


class RecipeList extends Component {

    constructor(props){
        super(props);
        this.state={
            recipes: [],
            recipeType: "ALL_TYPES",
            foodPreferences: "ALL"
        }

        if(!localStorage.getItem('accessToken')) {
            this.props.history.push("/")
        }
    }


    componentDidMount() {
        API.get(`/recipes`, {headers: {'Authorization': localStorage.getItem('accessToken')}})
          .then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({recipes: res.data});
          })
          .catch((error) => {
              console.log(error);
          })
    }

    handleRecipeTypeChange = event => {
        this.setState({ recipeType: event.target.value }, () => this.filterRecipes());
        console.log("TYPE");
    }

    handleFoodPreferencesChange = event => {
        this.setState({ foodPreferences: event.target.value }, () => this.filterRecipes());
        console.log("PREF");    
    }

    filterRecipes = () => {
        const type = this.state.recipeType;
        const preferences = this.state.foodPreferences;
    
        API.get(`/chosenrecipes/?type=${type}&preferences=${preferences}`, {headers: {'Authorization': localStorage.getItem('accessToken')}})
          .then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({recipes: res.data});
          })
          .catch((error) => {
              console.log(error);
          })
    }


    render() {
        return(
            <div>
                <div className="container">
                    <h1>Poznaj przepisy, których używamy w naszych jadłospisach!</h1>

                    <div className="btn-group btn-group-toggle recipeType" data-toggle="buttons">
                        {/* <label className="btn btn-secondary active"> */}
                        <label className="btn btn-secondary">
                            <input type="radio" name="options" value="ALL_TYPES" id="allType" onClick={this.handleRecipeTypeChange} defaultChecked={this.state.recipeType === "ALL_TYPES"}/> Wszystko
                        </label>
                        <label className="btn btn-secondary">
                            <input type="radio" name="options" value="BREAKFAST" id="breakfast" onClick={this.handleRecipeTypeChange} defaultChecked={this.state.recipeType === "BREAKFAST"}/> Śniadania
                        </label>
                        <label className="btn btn-secondary">
                            <input type="radio" name="options" value="DINNER" id="dinner" onClick={this.handleRecipeTypeChange} defaultChecked={this.state.recipeType === "DINNER"}/> Obiady
                        </label>
                        <label className="btn btn-secondary">
                            <input type="radio" name="options" value="SECOND_MEAL" id="secondMeal" onClick={this.handleRecipeTypeChange} defaultChecked={this.state.recipeType === "SECOND_MEAL"}/> Drugie śniadanie/deser
                        </label>
                        <label className="btn btn-secondary">
                            <input type="radio" name="options" value="SUPPER" id="supper" onClick={this.handleRecipeTypeChange} defaultChecked={this.state.recipeType === "SUPPER"}/> Kolacje
                        </label>
                    </div>

                    <div className="btn-group btn-group-toggle recipeType" data-toggle="buttons">
                        {/* <label className="btn btn-secondary active"> */}
                        <label className="btn btn-secondary">
                            <input type="radio" name="options" value="ALL" id="allPreferences" onClick={this.handleFoodPreferencesChange} defaultChecked={this.state.foodPreferences === "ALL"}/> Wszystko
                        </label>
                        <label className="btn btn-secondary">
                            <input type="radio" name="options" value="VEGETARIAN" id="vegetarian" onClick={this.handleFoodPreferencesChange} defaultChecked={this.state.foodPreferences === "VEGETARIAN"}/> Wegetariańskie
                        </label>
                        <label className="btn btn-secondary">
                            <input type="radio" name="options" value="LACTOSE_FREE" id="lactoseFree" onClick={this.handleFoodPreferencesChange} defaultChecked={this.state.foodPreferences === "LACTOSE_FREE"}/> Bez laktozy
                        </label>
                        <label className="btn btn-secondary">
                            <input type="radio" name="options" value="GLUTEN_FREE" id="glutenFree" onClick={this.handleFoodPreferencesChange} defaultChecked={this.state.foodPreferences === "GLUTEN_FREE"}/> Bez glutenu
                        </label>

                    </div>


                    <div className="recipes-wrapper">
                        {this.state.recipes.map(recipe =>
                            <div className="recipe-object" key={recipe.id}>
                                <img className="recipe-img" src={recipe.src}/>
                                <Link to={`/recipe/${recipe.id}`}>{recipe.recipeName}</Link>
                                        {/* <div className="recipe-info">
                                            
                                        </div> */}
                            </div>)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter (RecipeList);

