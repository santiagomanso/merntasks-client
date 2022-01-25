import React, {useContext} from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';




const Task = ({task}) => {
    
    //get project context, states and functions
    const projectContext_new = useContext(projectContext);
    const { actual_project  } = projectContext_new ;
    
    

    //get context, states and functions
    const task_context_new = useContext(taskContext);
    const { deleteTask, get_project_tasks, updateTask } = task_context_new;


    //get actual project
    const [selected_project] = actual_project
    

    //delete task when pressed
    const taskDeletion = id => {
        //console.log ("VALOR DE TASKID: ", id)
        //console.log ("VALOR DE selected project id: ", selected_project._id)
        deleteTask(id, selected_project._id);
        get_project_tasks(selected_project._id);
    }

    
    const changeStatus = task => {
        console.log(task.taskname);
        if (task.status) {
             task.status = false; 
            }
             else
            {
             task.status = true;
            }
            
            updateTask(task);
            
        
    }

    return ( 
        <li className="tarea sombra"> 

            <p>  {task.taskname} </p>

            <div className="estado">
                {task.status
                
                    ? (
                        <button type="button" className="completo" onClick={ ()=> changeStatus(task) }>Completed</button>
                    )   

                    : (
                        <button type="button" className="incompleto" onClick={ ()=> changeStatus(task) }>Incomplete</button>
                    )

                }
            </div>

            <div className="acciones">
                <button type="button" className="btn btn-primario"> edit </button> 
                <button type="button" className="btn btn-secundario" onClick = { ()=> taskDeletion(task._id)}> delete </button>
            </div>

        </li>
     );
}
 
export default Task;