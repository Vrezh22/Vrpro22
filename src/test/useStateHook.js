import React, { useState } from 'react';

const Hook = () => {
    //state
    const [counter, setCounter] = useState(0);
    const [language, setLanguage] = useState('Armenian');
    const [user, setUser] = useState({
        name: 'Ashot',
        age: 22
    });


    //handlers
    const handleClick = () => {
        setCounter(counter + 1);
    }
    const toggleChangeLanguage = () => {
        const l = language === 'Armenian' ? 'English' : 'Armenian';
        setLanguage(l);
    }
    const minusUserAge = () => {
        setUser({
            ...user,
            age: user.age - 1
        });
    }
    return (
        <div>
            <h1>Hook Component</h1>
            <p>Counter :{counter}</p>
            <p>Language :{language}</p>
            <div className="actions">
                <button onClick={handleClick}>Plus</button>
                <button onClick={toggleChangeLanguage}>Change Language  </button>
            </div>
            <div>
                <p>
                    User Name: {user.name}
                </p>
                <p>
                    User Age: {user.age}
                </p>
                <p>
                    <button onClick={minusUserAge}>Minus User Age</button>
                </p>
            </div>
        </div>
    );

};

export default Hook;