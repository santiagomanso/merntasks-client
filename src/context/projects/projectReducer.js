import {
    FORM_PROJECT,
    GET_PROJECTS,
    ADD_PROJECT,
    PROJECT_ERROR,
    FORM_VALIDATION,
    ACTUAL_PROJECT,
    DELETE_PROJECT
} from '../../types';


/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state, action) => {
    switch (action.type) {
        case FORM_PROJECT :
            return { 
                ...state,
                form: true
            }

        case GET_PROJECTS :        
        return {
            ...state,
            projects: action.payload
        }
        

        case ADD_PROJECT :
        return{
            ...state,
            projects: [...state.projects , action.payload ],
            form_error:false,
            form: false
        }

        case FORM_VALIDATION :
        return{
            ...state,
            form_error:action.payload
        }

        case ACTUAL_PROJECT :
        return{
            ...state,
            actual_project : state.projects.filter(project => project._id === action.payload)
        }   

        case DELETE_PROJECT : 
        return{
            ...state,
            projects : state.projects.filter(project => project._id !== action.payload),
            actual_project : null
        }

        case PROJECT_ERROR :
            return {
                ...state,
                msg : action.payload
            }

        default:
            return state;
    }
}