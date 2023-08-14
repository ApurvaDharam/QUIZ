import React, {useState} from 'react';
import{Link, useNavigate} from "react-router-dom";
import styles from './Signup.module.css';
import InputControl from '../InputControl/InputControl';
import {createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import {auth} from "../../firebase";

function Signup(){
    const navigate= useNavigate();
    const[values, setValues]= useState({
        name: "",
        email: "",
        pass: "",
    });

    const[errorMsg, setErrorMsg]= useState("");
    const[submitButtonDisabled, setSubmitButtonDisabled]= useState(false);

    const handleSubmission=() =>{
        if(!values.name || !values.email || !values.pass){
            setErrorMsg("please fill all the fields");
            return;
        }
        setErrorMsg("");
        
        setSubmitButtonDisabled(true);
        createUserWithEmailAndPassword(auth, values.email, values.pass)
        .then(async(res) => {
            setSubmitButtonDisabled(false);
            const user= res.user;
            await updateProfile(user, {
                displayName: values.name,
            });
            navigate('/');
        }) 
        .catch((err) => {
            setSubmitButtonDisabled(false);
            setErrorMsg(err.message);
            
        });
        
    };

    return(
        <div className={styles.container}>
            <div className={styles.innerBox}>
                <h1 className={styles.heading}>Signup</h1>
                <InputControl label="Name" placeholder="enter your name"
                 onChange= {(event) =>
                    setValues((prev) => ({...prev, name: event.target.value}))  //updatinng the value of name
                    }
                />
                <InputControl label="Email" placeholder="enter your email address"
                 onChange= {(event) =>
                    setValues((prev) => ({...prev, email: event.target.value}))  //uupdating the value of email
                    }
                />
                <InputControl label="Password" placeholder="enter your password"
                 onChange= {(event) =>
                    setValues((prev) => ({...prev, pass: event.target.value})) //updatinng the value of password
                    }
                />

                <div className='styles.footer'>
                    <b className='styles.error'>{errorMsg}</b>
                    <button onClick={handleSubmission} disabled={submitButtonDisabled}>Signup</button>
                    <p>
                        Alreaady have an account?{" "}
                        <span>
                            <Link to="/login">Login</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>

    )
}
export default Signup;