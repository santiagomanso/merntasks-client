import React, {useReducer} from 'react';
import taskContext from './taskContext';
import taskReducer from './taskReducer';
import {
     GET_TASKS,
     ADD_TASK,
     TASK_VALIDATION,
     DELETE_TASK,
     EDIT_TASK
     } from '../../types';
import axiosClient from '../../config/axios';


const TaskState = props => {
    //initial state
    const initialState = {        
        task_state : [],
        task_error : false,
        selected_task : null
    }

    //create dispatch and state
    const [state, dispatch] = useReducer(taskReducer, initialState)
    
     // Get tasks from a specific project
     const get_project_tasks = async project => {
        console.log('from taskState.j - project ID IS: ', project)
                
        try {
            const result = await axiosClient.get('/api/tasks', { params: { project }});  
            
            dispatch({
                type: GET_TASKS,
                payload: result.data.tasks
            })
        } catch (error) {
            
        }
    }
    



    //add new task
    const addTask = async task => {
        
        try {
            const result = await axiosClient.post('/api/tasks', task);
            
            dispatch({
                type:ADD_TASK,
                payload: result.data
            })

        } catch (error) {
            console.log(error);
        }
    }

    //taskform validation
    const validateTask = () => {
        dispatch({
            type : TASK_VALIDATION
            

        })
    }

    const deleteTask = async (id, project) => {
        console.log(" ESTE ES EL RESULTADO de ID:  ", id)
        console.log(" ESTE ES EL RESULTADO de PROJECT:  ", project)
        try {

            await axiosClient.delete(`/api/tasks/${id}`, { params : {project} });
            dispatch( {
                type : DELETE_TASK,
                payload : id
            })
            
        } catch (error) {
            
        }
    }


    const updateTask = async task => {
        try {
            const result = await axiosClient.put(`/api/tasks/${task._id}`, task)
            console.log(result);
            dispatch({
                type : EDIT_TASK,
                payload : result.data.task_existance
            })

        } catch (error) {
            
        }
    }

    return(
        <taskContext.Provider 
        value={
            {
                    task_state : state.task_state,
                    task_error : state.task_error,
                    selected_task : state.selected_task,
                    get_project_tasks,
                    addTask,
                    validateTask,
                    deleteTask,
                    updateTask
            }}>
            {props.children}
        </taskContext.Provider>
    )

}

export default TaskState;