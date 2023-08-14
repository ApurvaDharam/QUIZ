import React from 'react';
import { Link } from "react-router-dom";
import "../css/home.css";
function Home(props){
    return(
        
        <div className='home'>
            <h1 className='app-heading'>REACT QUIZ APP</h1>
            <div className="links">
                <h1>
                    <Link to='/login' className='custom-link'>Login</Link>
                </h1>

                <h1>
                    <Link to='/signup' className='custom-link'>Signup</Link>
                </h1>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <h2 className='welcome-message'>{props.name?`Welcome - ${props.name}`: "Login please"}</h2>
        </div>
    )
};
export default Home;