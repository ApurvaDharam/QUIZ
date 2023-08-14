// theme.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {db} from '../firebase'; // Import your Firebase configuration
import '../css/theme.css';

function Theme() {
  const themes = ['Tech', 'Sports', 'Geography', 'GeneralKnowledge'];
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [themeQuestions, setThemeQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async (theme) => {
      try {
        const questionsRef = db.collection(theme); // Use the correct collection name
        const snapshot = await questionsRef.get();
        const questions = snapshot.docs.map(doc => doc.data());
        setThemeQuestions(questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    if (selectedTheme) {
      fetchQuestions(selectedTheme);
    }
  }, [selectedTheme]);

  const handleTheme = (theme) => {
    setSelectedTheme(theme);
    navigate('/newQuiz', { state: { themeQuestions } });
  };

  return (
    <div className="theme">
      <h1>Choose a theme</h1>
      <div className="theme-list">
        {themes.map((theme, index) => (
          <button
            key={index}
            className="theme-button"
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
