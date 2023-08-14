
import styles from './Login.module.css';
import InputControl from '../InputControl/InputControl';
import React, {useState} from 'react';
import{Link, useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase";



function Login(){
    const navigate= useNavigate();
    const[values, setValues]= useState({
        email: "",
        pass: "",
    });

    const[errorMsg, setErrorMsg]= useState("");
    const[submitButtonDisabled, setSubmitButtonDisabled]= useState(false);

    const handleSubmission=() =>{
        if(!values.email || !values.pass){
            setErrorMsg("please fill all the fields");
            return;
        }
        setErrorMsg("");
        
        setSubmitButtonDisabled(true);
        signInWithEmailAndPassword(auth, values.email, values.pass)
        .then(async(res) => {
            setSubmitButtonDisabled(false);
            navigate('/Theme');
        }) 
        .catch((err) => {
            setSubmitButtonDisabled(false);
            setErrorMsg(err.message);
            
        });
        
    };


    return(
        <div className={styles.container}>
            <div className={styles.innerBox}>
                <h1 className={styles.heading}>Login</h1>
                <InputControl label="Email: " 
                onChange={event=> setValues(prev=>({...prev, email: event.target.value}))}
                placeholder="enter your email address"/>
                <InputControl label="Password: " 
                onChange={event=> setValues(prev=>({...prev, pass: event.target.value}))}
                placeholder="enter your password"/>

                <div className={styles.footer}>
                    <b className={styles.error}>{errorMsg}</b>
                    <button disabled= {submitButtonDisabled} onClick= {handleSubmission}>Login</button>
                    <p>
                        Already have an account?{" "}
                        <span>
                            <Link to="/signup">Sign up</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>

    )
}
export default Login;