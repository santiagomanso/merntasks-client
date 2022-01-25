import React, { useReducer } from 'react';
import alertReducer from './alertReducer';
import alertContext from './alertContext';
import { HIDE_ALERT, SHOW_ALERT } from "../../types";


const AlertState = props => {

    const initialState = {
        alert : null
    }

    const [state, dispatch] = useReducer(alertReducer, initialState)

    //funcionts
    const showAlert = (msg, category) => {
        dispatch({
            type: SHOW_ALERT,
            payload: {
                msg,
                category
            }
        });

        //after 5 secs clears the alert
        setTimeout( ()=> {
            dispatch({
                type: HIDE_ALERT
            })
        },6000);
    }

    return(
        <alertContext.Provider
            value={{
                alert: state.alert,
                showAlert
            }}
        >
            {props.children}
        </alertContext.Provider>

    )
}

export default AlertState;