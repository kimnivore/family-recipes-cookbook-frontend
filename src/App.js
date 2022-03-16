import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import styled from 'styled-components';
// import PrivateRoute from './utils/PrivateRoute';

import { connect } from 'react-redux';

import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Recipes from './components/Recipes';
import RecipeCard from './components/RecipeCard';
import AddRecipe from './components/AddRecipe';
import UpdateRecipe from './components/UpdateRecipe';


function App() {
  return (
    <AppContainer>
  
        <Navigation />
    
        <Switch>
          <Route path='/update-recipe/:recipe_id' component={UpdateRecipe} />
          <Route path='/add-recipe' component={AddRecipe} />
          <Route path='/recipes/:recipe_id' component={RecipeCard} />
          <Route path='/recipes' component={Recipes} />
          <Route path='/logout' component={Logout} />
          <Route path='/register' component={Register} /> 
          <Route path='/login' component={Login} />
          <Route path='/'>{localStorage.getItem('token') ? (<Redirect to='/recipes' /> ) : (<Redirect to='/login' />)} </Route>
        </Switch>
      
    </AppContainer>
  );
}

const mapStateToProps = (state) => {
  return ({
    users: state.users,
    recipes: state.recipes,
    token: state.token
  })
}

export default connect(mapStateToProps, {})(App);


const AppContainer = styled.div`
  height: 100%;
  border: 1px solid black;
`