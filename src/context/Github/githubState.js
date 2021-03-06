import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import {SEARCH_USERS,SET_ALERT,SET_LOADING,GET_REPOS,GET_USER,CLEAR_USERS} from '../types'

let githubClientID;
let githubClientSecret;
if(process.env.NODE_ENV != 'production'){
githubClientID = process.env.REACT_APP_GITHUB_CLIENTID
githubClientSecret = process.env.REACT_APP_GITHUB_CLIENTSECRET
}
else{
githubClientID = process.env.GITHUB_CLIENT_ID
githubClientSecret = process.env.GITHUB_CLIENT_SECRET
}


const GithubState = props => {
    const initialState ={
        users: [],
        user: {},
        loading: false,
        repos:[]
    };

    const[state,dispatch] = useReducer(GithubReducer, initialState);

    //search users

  const searchUsers = async (text) => {
    setLoading();
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id =${githubClientID}
    &client_secret=${githubClientSecret}`);
    console.log(res.data.items);
  dispatch({type: SEARCH_USERS, payload: res.data.items})
  };

    //get user
    const getUser = async username => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}?client_id =${githubClientID}
        &client_secret=${githubClientSecret}`);
      dispatch({type: GET_USER , payload: res.data})
      }
    //get repos


    const getUsersRepo  = async username => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id =${githubClientID}
        &client_secret=${githubClientSecret}`);
        dispatch({type: GET_REPOS , payload: res.data})
      }
    
    
    //clear users
const clearUsers = () => dispatch({type: CLEAR_USERS})

    //set loading
    const setLoading = () => dispatch({type: SET_LOADING})
    return (
        <GithubContext.Provider
        value = {{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading:state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUsersRepo
    }} >
        {props.children}
        </GithubContext.Provider> 
        );// wrap entire application
};
  
export default GithubState;