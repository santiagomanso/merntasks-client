import React, { Fragment, useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';


const NewProject = () => {

    //get project state, get show fn from Context
    const projectContext_new = useContext(projectContext)
    //extract STATES first, then extract fn
    const { form, form_error, showForm, addProject, showError  } = projectContext_new ;

    //Default state
    const [project, setProject] = useState({
        project_name:''
    });


    //extract project names
    const {project_name} = project;

    //get input text
    const onChangeProject = (e)=> {
        showError(false); //this will put the error on the input on false after a keystroke
        setProject({
            ...project,
            [e.target.name] : e.target.value
        })
    }


    //submit form
    const onSubmit = (e) =>{
        e.preventDefault();

        //project validation
            if (project_name === '') {
                showError(true);
                return;
            }
        //add state
            addProject(project);
        //reset form
        setProject({
            project_name: ''
        })
    }

    //function 
    const handlerForm = ()=> {
        showForm()
    }

    return (
    <Fragment>
        <button
        type="button"
        className="btn btn-block btnprimario"
        onClick={ handlerForm }
        >
            New Project
        </button>

        {
            form 
            ? (
                <form className="formulatio-nuevo-proyecto" onSubmit={onSubmit}>
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Project name"
                        name="project_name"
                        value={project_name}
                        onChange={onChangeProject}
                        />

                    <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Add new Project"
                        
                        />
                </form>
            ) : null }

    { form_error 
        ? <p className="mensaje error">Project Name is mandatory</p>
        : null
    }

    </Fragment>
     );
}
 
export default NewProject;