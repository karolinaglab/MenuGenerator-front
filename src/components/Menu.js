import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom';
import '../styles/MainPage.css';

class Menu extends Component {


    constructor(props){
        super(props);
    }

    

    render() {
        var recipeTypesMap = new Map();
        recipeTypesMap.set('BREAKFAST', 'Śniadanie');
        recipeTypesMap.set('SECOND_MEAL', 'Drugie śniadanie/Deser');
        recipeTypesMap.set('DINNER', 'Obiad');
        recipeTypesMap.set('SUPPER', 'Kolacja');
        return (
            
                    <div className="container menuContainer">
                        <h1>Twój jadłospis na {this.props.recipeInfos[0].recipeDate}</h1>
                        <div className="recipes-wrapper">
                            {this.props.recipeInfos.map(recipeinfo => 
                                <div className="recipeInfoObject" key={recipeinfo.id}>
                                    <div className="recipeDetails">
                                        <h3>{recipeTypesMap.get(recipeinfo.recipe.recipeType)}:</h3>
                                        <div className="recipe-info">
                                            <Link to={`/recipe/${recipeinfo.recipe.id}`}>{recipeinfo.recipe.recipeName}</Link>
                                            <p>Ilość porcji: {recipeinfo.numberOfPortionsForUser}</p>
                                        </div>
                                    </div> 
                                    <div className="img-wrapper">
                                        <img className="recipe-img" src={recipeinfo.recipe.src}/>
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
        );
    }
}

export default withRouter (Menu);