import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../css/theme.css';


function Theme(){

    const themes= ['Tech Trivia', 'Sports', 'Geography', 'General Knowledge'];
    const navigate= useNavigate();
    const [selectedTheme, setSelectedTheme] = useState(null);
    const handleTheme= (theme) => {
        setSelectedTheme(theme);
        navigate('/Quiz2');
    };

    return(
        <div className='theme'>
            <h1 className='theme-heading'>Choose a theme</h1>
            <div className='theme-list'>
                {themes.map((theme, index) => (
                    <button
                    key= {index}
                    className='theme-button'
                    onClick={() => handleTheme(theme)}
                    >
                        {theme}
                    </button>
                ))}
            </div>   
        </div>
    );
}
export default Theme;