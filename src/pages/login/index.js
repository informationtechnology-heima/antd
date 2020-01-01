import React from 'react';
import login from '../../assets/login.jpg'
export default class Login extends React.Component{



    render = () => {
        return(
            <div>
            <img src={login} style={
                {
                    width:"100%",
                    height:"100vh"
                }
            }></img>
        </div>
        )
    }
}