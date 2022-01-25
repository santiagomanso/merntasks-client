import React, {useReducer} from 'react';
import authReducer from './authReducer';
import authContext from './authContext';


import { 
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOG_OUT } from "../../types";
import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = props => {

    const initialState = {
        token : localStorage.getItem('token'),
        authenticated : null,
        user: null,
        msg : null,
        loading : true
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const registerUser = async data=> {

        try {
            const response = await axiosClient.post('/api/users', data);
            
            dispatch({
                type : REGISTRATION_SUCCESS,
                payload: response.data
            });

            //get user
            authenticatedUser();

        }
            catch (error) {
           // console.log(error.response.data.msg);
           const alert = {
               msg : error.response.data.msg,
               category: 'alert-error'
           }

           dispatch({
               type : REGISTRATION_ERROR,
               payload: alert
           })
        }

        
        
    }

    //return authenticated user
    const authenticatedUser = async () => {

        const token = localStorage.getItem('token');
        
        if (token) {
            //send token via headers 
            tokenAuth(token);
        }

        try {

            const response = await axiosClient.get('/api/auth')
            
            dispatch({
                type : GET_USER,
                payload : response.data.user
            });
            
        } catch (error) {
            console.log(error.response);
            dispatch({
                type : LOGIN_ERROR
            })
        }


    }


    //when user logs in
    const logIn = async data => {
        try {
            
            const response = await axiosClient.post('/api/auth', data);
            dispatch({
                type : LOGIN_SUCCESS,
                payload : response.data
            });

            //get user
            authenticatedUser();

        } catch (error) {
            
            console.log(error.response.data.msg);
           const alert = {
            msg : error.response.data.msg,
            category: 'alert-error'
        }

        dispatch({
            type : LOGIN_ERROR,
            payload: alert
        })
            
        }

    }


    const logOut = () =>{
        dispatch({
            type : LOG_OUT
        })
    }

    return(
        <authContext.Provider
            value={{
                token : state.token,
                authenticated : state.authenticated,
                user : state.user,
                msg : state.msg,
                loading : state.loading,
                registerUser,
                logIn,
                authenticatedUser,
                logOut
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}
export default AuthState;