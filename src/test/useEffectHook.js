import React, { useEffect, useState } from 'react';

const Hook = () => {
    //state
    const [counter, setCounter] = useState(0);
    const [language, setLanguage] = useState('Armenian');
    //effects
    useEffect(function () {
        document.title = 'Effect Hook';
        console.log('effect 1 ');
    }, [])
    useEffect(() => {
        console.log('Starting server Get request...');
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(res => res.json())
            .then(data => {
                console.log('data Fetch', data);
            })
    }, [])

    useEffect(() => {
        console.log('Dependencies Counter  ,counter = ', counter);
    }, [counter])
    useEffect(() => {
        console.log('Dependencies language  ,language = ', language);
    }, [language])



    //handlers
    const handleClick = () => {
        setCounter(counter + 1);
    }
    const toggleChangeLanguage = () => {
        const l = language === 'Armenian' ? 'English' : 'Armenian';
        setLanguage(l);
    }
    console.log('render');
    return (
        <div>
            <h1>Effect Hook Component</h1>
            <p>Counter :{counter}</p>
            <p>Language :{language}</p>
            <div className="actions">
                <button onClick={handleClick}>Plus</button>
                <button onClick={toggleChangeLanguage}>Change Language  </button>
            </div>
        </div>
    );

};

export default Hook;