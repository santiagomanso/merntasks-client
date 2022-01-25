import { 
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOG_OUT } from "../../types";


/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state, action) => {

    

    switch (action.type) {

        case REGISTRATION_SUCCESS : 
        case LOGIN_SUCCESS :
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                authenticated : true,
                msg : null,
                loading : false
            }

            case GET_USER : 
            return {
                ...state,
                authenticated : true,
                user: action.payload,
                loading : false
            }

            

            case LOGIN_ERROR :
            case REGISTRATION_ERROR :                
            case LOG_OUT :
                localStorage.removeItem('token');
                return{
                    ...state,
                    token : null,
                    user : null,
                    authenticated : null,
                    msg : action.payload,
                    loading : false
                }



        default:
            return state;
    }
}