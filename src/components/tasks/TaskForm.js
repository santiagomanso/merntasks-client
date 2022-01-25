import React, {useContext, useState} from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const TaskForm = () => {

    //extract context and ACTUAL PROJECT
    const projectContext_new = useContext(projectContext)
    const { actual_project  } = projectContext_new ;

    //extract task context, and task functions from it's context
    const task_context_new = useContext(taskContext);
    const { addTask, validateTask, task_error, get_project_tasks } = task_context_new;

    //form state
    const [task, setTask] = useState(
        {taskname : ''}
    )

    //extract task name
    const { taskname } = task;
    
    if (!actual_project) return null;
    
    const [selected_project] = actual_project;
    

    const handlerChange = e => {
        setTask({
            ...task,
            [e.target.name] : e.target.value
        })
    }

    const handlerSubmit = (e) =>{
        e.preventDefault();
        //validate
        if (taskname.trim() === '') {
            validateTask();
            return;
        }
        


        //add new task
        task.project = selected_project._id;
        
        addTask(task);
        
        //get project tasks
        get_project_tasks(selected_project._id);

        //reset form
        setTask({
            taskname : ''
        })
    }

    return ( 
        <div className="formulario">
            <form onSubmit={handlerSubmit}>
                <div className="contenedor-input">
                    <input
                         type="text"
                         className="input-text" 
                         placeholder="Task Name..." 
                         name="taskname"
                         value={taskname} 
                         onChange={handlerChange} />                    
                </div>

            <div className="contenedor-input">
                <input type="submit" className="btn btn-primario btn-submit btn-block" value="Add new task" />
            </div>
            
            </form>
            { task_error ? <p className="mensaje error">Task name is mandatory</p> : null}
        </div>
    );
}
 
export default TaskForm;