import { 
    ADD_TASK,
    DELETE_TASK,
    EDIT_TASK,
    GET_TASKS,
    TASK_VALIDATION,
} from "../../types";


/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state, action) => {
    switch(action.type){

        case GET_TASKS :
                      
            return{
                ...state,
                task_state : action.payload
            }

        case ADD_TASK :         
        return{
            ...state,
            task_state : [action.payload, ...state.task_state ],
            task_error : false
        }

        case TASK_VALIDATION :
        return {
            ...state,
            task_error : true
        }

        case DELETE_TASK : 
        return{
            ...state,
            task_state : state.task_state.filter(task => task.task_id !== action.payload)
        }

        case EDIT_TASK :
        return{
            ...state,
            task_state : state.task_state.map(task => task.task_id === action.payload._id ? action.payload : task),
            
        }

        default:
            return state;
    }
}