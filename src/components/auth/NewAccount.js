import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


import alertContext from '../../context/alerts/alertContext'; // capital A to use lowercase a on variable
import authContext from '../../context/auth/authContext';





const NewAccount = (props) => {

    //extract values from context (alerts)
    const AlertContext = useContext(alertContext) //lowercase alertContext => AlertContext
    const {alert, showAlert} = AlertContext;

    //extract values from auth context
    const AuthContext = useContext(authContext);
    const { msg, authenticated, registerUser } = AuthContext

    //in case user is authenticated, || registered || duplicated registration
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
        name: '',
        email: '',
        password: '',
        password_confirm:''
    })

    //user extraction
    const {name, email, password, password_confirm} = user;


    //get input text
    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
        //empty field validation
            if ( name.trim() === '' ||
                 email.trim() === '' || 
                 password.trim() === '' ||
                 password_confirm.trim() === '') {
                    showAlert('All fields are mandatory', 'alert-error')
                    return;
                 }


        //minimum password length
                 if (password.length < 6 ) {
                     showAlert('password must be at least 5 characters long','alert-error');
                     return;
                 }



        //password confirmation validation
                 if (password !== password_confirm) {
                     showAlert('pasword dosent match','alert-error');
                     return;
                 }

        //action method
                    registerUser({
                        name,
                        email,
                        password
                    })


    }


    return ( 
        <div className="form-usuario">
            {alert ? ( <div className={`alert ${alert.category}`}> {alert.msg}</div> ) : null}
            <div className="contenedor-form sombra-dark">
                <h1>New Account</h1>

                <form onSubmit={onSubmit}>

                <div className="campo-form">
                        <label htmlFor="name">name</label>
                        <input
                            type="text" 
                            id="name"
                            name="name"
                            placeholder="enter your name"
                            value={name}
                            onChange={onChange}
                            />
                    </div>






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
                        <label htmlFor="password">confirm Password</label>
                        <input
                            type="password" 
                            id="password_confirm"
                            name="password_confirm"
                            placeholder="confirm your password"
                            autoComplete="on"
                            value={password_confirm}
                            onChange={onChange}
                            />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Register new account"/>
                    </div>

                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Already have an account? Log In
                </Link>

            </div>
        </div>
     );
}
 
export default NewAccount;