import React, { Component } from 'react';
import API from '../axiosConfig';
import { withRouter } from 'react-router-dom';
import '../styles/MainPage.css';
import Menu from './Menu';

class MenuCreator extends Component {


    constructor(props){
        super(props);
        this.state={
            menuType: 'DAILY_MENU',
            foodPreferences: 'ALL',
            isCreated: false,
            recipeInfos: []
        }

        if(!localStorage.getItem('accessToken')) {
            this.props.history.push("/")
        }
    }



    handleMenuTypeChange = event => {
        this.setState({menuType: event.target.value});
    }

    handleFoodPreferencesChange = event => {
        this.setState({foodPreferences: event.target.value});
    }


    createMenu = event => {
        event.preventDefault();

        const menuDetails = {
            menuType: this.state.menuType,
            foodPreferences: this.state.foodPreferences
        }

        API.post(`/menu`, menuDetails, {headers: {'Authorization': localStorage.getItem('accessToken')}})
          .then(res => {
            console.log(res);
            console.log(res.data);
            const recipeInfos = res.data.recipeInfos;
            const sortedRecipeInfos = recipeInfos.sort(this.sortList);
            this.setState({
                recipeInfos: sortedRecipeInfos,
                isCreated: true
            }
            );

          })
          .catch((error) => {
              console.log(error);
          })
    }

    sortList(a, b){
        return a.id-b.id;
    }


    render() {
        return (
            <div className="container">
                <form onSubmit={this.createMenu}>
                    <div className="form-group">
                        <label>Wybierz rodzaj jadłospisu</label>
                        <select className="custom-select" value={this.state.menuType} onChange={this.handleMenuTypeChange} id="inputGroupSelect01">
                                <option value="DAILY_MENU">Jednodniowy</option>
                                <option value="WEEKLY_MENU">Na cały tydzień</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Wybierz preferencje żywieniowe</label>
                        <select className="custom-select" value={this.state.foodPreferences} onChange={this.handleFoodPreferencesChange} id="inputGroupSelect02">
                            <option value="ALL">Brak preferencji</option>
                            <option value="LACTOSE_FREE">Bez laktozy</option>
                            <option value="VEGETARIAN">Wegetariański</option>
                            <option value="GLUTEN_FREE">Bez glutenu</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-outline-success btn-lg">Zatwierdź</button>

                    {this.state.isCreated && <Menu recipeInfos={this.state.recipeInfos}></Menu>}
                </form>
            </div>
            
        );
    }
}

export default withRouter (MenuCreator);