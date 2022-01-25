import React, {useContext} from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';


const Project = ({project}) => {

    //get project state, get show fn from Context
    const projectContext_new = useContext(projectContext)
    //extract STATES first, then extract fn
    const { activeProject  } = projectContext_new ;
    
    //get task context
    const task_context_new = useContext(taskContext);
    const { get_project_tasks } = task_context_new;


    const select_active_project = id => {
        activeProject(id);
        get_project_tasks(id);
        
    }

    return ( 
        <li>
            <button type="button" className="btn btn-blank" onClick={ ()=> select_active_project(project._id) }>
                {project.project_name}
            </button>
        </li>
     );
}
 
export default Project;