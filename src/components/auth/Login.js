import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import alertContext from '../../context/alerts/alertContext'; // capital A to use lowercase a on variable
import authContext from '../../context/auth/authContext';

const Login = (props) => {
 
     //extract values from context (alerts)
     const AlertContext = useContext(alertContext) //lowercase alertContext => AlertContext
     const {alert, showAlert} = AlertContext;
 
     //extract values from auth context
     const AuthContext = useContext(authContext);
     const { msg, authenticated, logIn } = AuthContext;

     //when password or user dosent exist
     useEffect(() => {
        
        if (authenticated){
           props.history.push('/projects');
         } 
        

        if (msg){
            showAlert(msg.msg, msg.category)
        }
    //eslint-disable-next-line
    }, [msg, authenticated, props.history])

    //State to log-in 
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    //user extraction
    const {email, password} = user;


    
    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        //validate empty fields
        if (email.trim() === '' || password.trim() === '') {
            showAlert('All fields are mandatory', 'alert-error');
        }

        //pass it to logIn function
        logIn({ email, password });

    }


    return ( 
        <div className="form-usuario">
            {alert ? ( <div className={`alert ${alert.category}`}> {alert.msg}</div> ) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Login</h1>

                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email" 
                            id="email"
                            name="email"
                            placeholder="enter your email"
                            value={email}
                            onChange={onChange}
                            />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password" 
                            id="password"
                            name="password"
                            placeholder="type in your password"
                            value={password}
                            onChange={onChange}
                            autoComplete="on"
                            />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Log In" />
                    </div>

                </form>
                <Link to={'/new-account'} className="enlace-cuenta">
                    new account
                </Link>

            </div>
        </div>
     );
}
 
export default Login;