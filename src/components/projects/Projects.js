import React, {useContext, useEffect} from 'react';
import authContext from '../../context/auth/authContext';
import Header from '../layout/Header';
import SideBar from '../layout/SideBar';
import TaskForm from '../tasks/TaskForm';
import TaskList from '../tasks/TaskList';


const Projects = () => {

    //extract auth information
    const AuthContext = useContext(authContext)
    const { authenticatedUser } = AuthContext;


    useEffect(() => {
        authenticatedUser();
        //eslint-disable-next-line
    }, [])



    return ( 
        <div className="contenedor-app">
            <SideBar />

            <div className="seccion-principal">
                <Header />


                <main>

                    <TaskForm />

                    <div className="contenedor-tareas">
                        <TaskList />
                    </div>
                </main>
            </div>

        </div>
     );
}
 
export default Projects;