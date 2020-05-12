import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom';
import API from '../axiosConfig';
import NavigationBar from './NavigationBar';
import '../styles/RecipeList.css';


class RecipeList extends Component {

    constructor(props){
        super(props);
        this.state={
            recipes: [],
            name: ''
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


    render() {
        return(
            <div>

                <section className="recipes">
                    <div className="container">
                        <h1>Poznaj przepisy, których używamy w naszych jadłospisach!</h1>
                        <div className="recipes-wrapper">
                            {this.state.recipes.map(recipe =>
                                <div className="recipe-object" key={recipe.id}>
                                    <img className="recipe-img" src={recipe.src}/>
                                    {recipe.recipeName}
                                        {/* <div className="recipe-info">
                                            
                                        </div> */}
                                </div>)
                            }
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default withRouter (RecipeList);

