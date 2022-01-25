import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import {
            FORM_PROJECT,
            GET_PROJECTS,
            ADD_PROJECT,
            PROJECT_ERROR,
            FORM_VALIDATION,
            ACTUAL_PROJECT,
            DELETE_PROJECT
        } from '../../types';
import axiosClient from '../../config/axios';
        


    


const ProjectState = props =>{   

    const initialState = {        
        //send the name to the Project.js project-button name, they must match.
        projects : [],
        form : false,
        form_error : false,
        actual_project : null,
        msg : null
    }

    //dispatch to execute actions
    const [state, dispatch] = useReducer(projectReducer, initialState)



    const getProjects = async () => {
        try {
            const result = await axiosClient.get('/api/projects');
            
            dispatch({
                type: GET_PROJECTS,
                payload: result.data.projects
            })
        } catch (error) {
            const alert = {
                msg: 'Hubo un error',
                category: 'alert-error'
            }
            
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }


    //CRUD functions
    const showForm = () => {
        dispatch({
            type: FORM_PROJECT
        })
    }

    //add new project
    const addProject = async project => {
        //insert new project into state
        try {
            const result = await axiosClient.post('/api/projects', project)
            
            dispatch({
                type : ADD_PROJECT,
                payload : result.data
            })
            
        } catch (error) {
            console.log(error)
        }
        
    }

    //form validation, looking for errors
    const showError = (boolean) => {
        dispatch({
            type: FORM_VALIDATION,
            payload: boolean
        })
    }

    //select actual project
    const activeProject = projectId => {
        dispatch({
            type: ACTUAL_PROJECT,
            payload: projectId
        })
    }


    //delete a project
    const deleteProject = async projectId => {
        try {
            
            await axiosClient.delete(`/api/projects/${projectId}`)
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })

        } catch (error) {
            const alert = {
                msg : 'There was an error',
                category : 'alert-error'
            }
            dispatch({
                type : PROJECT_ERROR,
                payload : alert
            })
        }
    }

    return (
        <projectContext.Provider
         value={
            {
                //states
                projects: state.projects,
                form : state.form,
                form_error : state.form_error,
                actual_project : state.actual_project,
                msg : state.msg,

                //functions
                showForm,
                getProjects,
                addProject,
                showError,
                activeProject,
                deleteProject
            }
        }>
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;