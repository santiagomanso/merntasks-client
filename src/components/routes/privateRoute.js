import React, { useContext, useEffect } from 'react';
import {Route, Redirect} from 'react-router-dom';
import authContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...props }) => {
    
    const AuthContext = useContext(authContext);
    const { loading, authenticated, authenticatedUser } = AuthContext;

    useEffect(() => {
        authenticatedUser();
        //eslint-disable-next-line
    }, [])
    
    return ( 
        <Route { ...props } render={ props => !authenticated && !loading ? (
                <Redirect to='/' />
            ) : (
                <Component {...props} />
            )  }
        />
     );
}
 
export default PrivateRoute;