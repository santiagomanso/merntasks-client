import React, {useContext, useEffect} from 'react';
import projectContext from '../../context/projects/projectContext';
import Project from './Project';

import {CSSTransition, TransitionGroup} from 'react-transition-group'
import alertContext from '../../context/alerts/alertContext';


const ProjectList = () => {

    const projectContext_new = useContext(projectContext);
    const { msg, projects, getProjects } = projectContext_new;

    const AlertContext = useContext(alertContext);
    const { alert, showAlert } = AlertContext;

    // Obtener proyectos cuando carga el componente
    useEffect(() => {
        // si hay un error
        if(msg) {
            showAlert(msg.msg, msg.category);
        }

        getProjects();
        // eslint-disable-next-line
    }, [msg]);


    //check if projects has content or not, the first time when using DB will give null
    
    if (projects.length === 0) return <p>There are no projects, start by creating one..</p>;

    

    return ( 
        <ul className="listado-proyectos">
            {alert ? ( <div className={`alert ${alert.category}`}>{ alert.msg }</div> ) : null }

            <TransitionGroup>
            {projects.map(project => (
                <CSSTransition
                    key={project._id}
                    timeout={200}
                    classNames="proyecto"
                >
                    <Project 
                    
                    project={project}
                />
                </CSSTransition>
            ))}
            </TransitionGroup>
        </ul>
     );
}
 
export default ProjectList;