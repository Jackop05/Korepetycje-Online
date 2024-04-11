import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';




const handleLogin = async (id, name, surname, email, password, navigate, change, setChange, error, setError) => {
    const data = {
        id, 
        name,
        surname,
        email, 
        password,
    }
    
    try {
        const res = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
        if(res.ok) {
            (change === 1) ? setChange(0) : setChange(1)
            navigate('/main')
            setError('')
        } else {
            setError('Wrong email or password');
            console.log('wrong password or email')
        }
    }
    catch (err) {
        console.log(err);
    }
}

const handleEmailChange = (event, setEmail) => {
    event.preventDefault();
    setEmail(event.target.value);
}

const handlePasswordChange = (event, setPassword) => {
    event.preventDefault();
    setPassword(event.target.value);
}

export default function CreateUser(props) {
    const { change, setChange } = props;

    const navigate = useNavigate();
    const [ error, setError ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');



    return (
        <div className="login-page">
            <div className="home-link">
                <Link to="/"><img className="home-icon home-icon-login" src="./images/home.png" alt="home link icon" /></Link>
            </div>
            <div className="main-login">
                <div className="create-user-image-box-1"><img className="create-user-image create-user-image-1" src="./images/learningLogin1.png" alt="studying man image" /></div>
                <div className="middle">
                    <div className="login-template">
                        <div className="login-header">Zaloguj się</div>
                        <form className="login-form">
                            <div className="form-title">Email</div>
                            <div className="form-text">
                                <img className="form-icon" src="./images/user.png" alt="person icon" />
                                <input type="email" name="email" placeholdedr="Wprowadż email" onChange={(event) => {handleEmailChange(event, setEmail)}} value={email}></input>
                            </div>
                            <div className="form-title">Hasło</div>
                            <div className="form-text">
                                <img className="form-icon" src="./images/lock.png" alt="person icon" />
                                <input type="password" name="imie" placeholdedr="Wprowadż hasło" onChange={(event) => {handlePasswordChange(event, setPassword)}} value={password}></input>
                            </div>
                        </form>
                        {error &&
                            <div className="error">{error}</div>
                        }
                        <button className="button login-button" onClick={() => {handleLogin(12345, 'Jakub', 'Sztobryn', email, password, navigate, change, setChange, error, setError)}}>Zarejestruj</button>
                    </div>
                </div>
                <div className="create-user-image-box-2"><img className="create-user-image create-user-image-2" src="./images/learningLogin2.png" alt="studying man image" /></div>
            </div>
        </div>
    )
}