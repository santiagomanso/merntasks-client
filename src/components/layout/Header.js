import React, { useContext, useEffect } from 'react';
import authContext from '../../context/auth/authContext';
 

const Header = () => {

    //extract auth information
    const AuthContext = useContext(authContext)
    const { user, authenticatedUser, logOut } = AuthContext;


    useEffect(() => {
        authenticatedUser();
        //eslint-disable-next-line
    }, [])


    return ( 
        <header className="app-header">
            { user ? <p className="nombre-usuario"> Hello <span> {user.name} </span></p> : null  }
            
            <nav className="nav-principal">
                <button className="btn btn-blank cerrar-sesion" onClick={ logOut }>
                    Log out..
                </button>
            </nav>
        </header>
     );
}
 
export default Header;