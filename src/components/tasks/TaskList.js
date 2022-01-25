import React, { Fragment, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';



import Task from './Task';


const TaskList = () => {   

    //get project state, get show fn from Context
    const projectContext_new = useContext(projectContext)
    const { actual_project, deleteProject  } = projectContext_new ;

    //get tasks from project and fn
    const task_context_new = useContext(taskContext);
    const { task_state } = task_context_new;

    

    if (!actual_project) return <h2>Select a project</h2>

    const [selected_project] = actual_project;

    


    //delete a Project
    const handlerDelete = () =>{
        deleteProject(selected_project._id);
    }

    return ( 
        <Fragment>

        <h2>Project: {selected_project.project_name}</h2>

        <ul className="listado-tareas">
            {task_state.length === 0
                ? <li className="tarea"> <p>there is no task </p> </li>
                : task_state.map(task => ( //this same task is the key
                     <Task task={task} classNames="tarea" key={task._id}  />                   
                ))
              
            }
        </ul>

            <button type="button" className="btn btn-primario" onClick={ handlerDelete }> delete project &times;</button>

        </Fragment>
     );
}
 
export default TaskList;