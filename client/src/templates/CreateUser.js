import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';



const handleNameChange = (event, setName) => {
    event.preventDefault();
    setName(event.target.value);
}

const handleSurnameChange = (event, setSurname) => {
    event.preventDefault();
    setSurname(event.target.value);
}

const handleEmailChange = (event, setEmail) => {
    event.preventDefault();
    setEmail(event.target.value);
}

const handlePasswordChange = (event, setPassword) => {
    event.preventDefault();
    setPassword(event.target.value);
}

const validateEmail = (email, setEmailErrorHTML) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        setEmailErrorHTML('Zły adres email');
    }
    return emailRegex.test(email);
};

const navigateToWelcoming = (navigate) => {
    navigate('/');
}

const eraseCharacters = (name, surname, email, password, setName, setSurname, setEmail, setPassword) => {
    if (name.length != 0) {
        setName(prevName => prevName.slice(0, -1));
    }
    if (surname.length != 0) {
        setSurname(prevSurname => prevSurname.slice(0, -1));
    }
    if (email.length != 0) {
        setEmail(prevEmail => prevEmail.slice(0, -1));
    }
    if (password.length != 0) {
        setPassword(prevPassword => prevPassword.slice(0, -1));
    }
}

const initEraseCharacters = (name, surname, email, password, setName, setSurname, setEmail, setPassword, navigate) => {
    let max = Math.max(name.length, email.length, email.length, password.length);
    let i;;
    for(i = 0; i < max; i++) {
        setTimeout(() => {eraseCharacters(name, surname, email, password, setName, setSurname, setEmail, setPassword)}, 100*i);
    }
    setTimeout(() => {navigateToWelcoming(navigate)}, 100*i + 500);
};

const handleRegister = async (name, surname, email, password, setName, setSurname, setEmail, setPassword, nameErrorHTML, surnameErrorHTML, emailErrorHTML, passwordErrorHTML, setNameErrorHTML, setSurnameErrorHTML, setEmailErrorHTML, setPasswordErrorHTML, navigate) => {
    const data = {
        name,
        surname,
        email,
        password
    }

    const passLength = password.length;
    console.log('poassword: ', password, 'password length: ', passLength);

    console.log('name: ', nameErrorHTML)
    console.log('surname: ', surnameErrorHTML)
    console.log('email: ', emailErrorHTML)
    console.log('password: ', passwordErrorHTML)

    const ifCorrectEmail = validateEmail(email, setEmailErrorHTML);

    if(name == '' || surname == '' || email == '' || passLength < 4 || passwordErrorHTML != '') {
        if(name == '') {
            setNameErrorHTML('Imię musi mieć conajmniej 1 znak');
        } else {
            setNameErrorHTML('');
        }
        if(surname == '') {
            setSurnameErrorHTML('Nazwisko musi mieć conajmniej 1 znak');
        } else {
            setSurnameErrorHTML('');
        }
        if(email == '') {
            setEmailErrorHTML('Email musi mieć conajmniej 1 znak');
        } else {
            if(ifCorrectEmail){
                setEmailErrorHTML('');
            }
        }
        console.log('passLenght: ', passLength)
        if(passLength < 4) {
            setPasswordErrorHTML('Hasło musi mieć conajmniej 4 znaki');
        } else {
            setPasswordErrorHTML('');
        }
    } else if (nameErrorHTML == '' && surnameErrorHTML == '' && emailErrorHTML == '' && passwordErrorHTML == '') {
        initEraseCharacters(name, surname, email, password, setName, setSurname, setEmail, setPassword, navigate);

        if(ifCorrectEmail) {
            try {
                const res = await fetch('/register', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            catch (err) {
                console.log(err);
            }
        }
    }
}



export default function CreateUser() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [ nameErrorHTML, setNameErrorHTML] = useState('');
    const [ surnameErrorHTML, setSurnameErrorHTML] = useState('');
    const [ emailErrorHTML, setEmailErrorHTML] = useState('');
    const [ passwordErrorHTML, setPasswordErrorHTML] = useState('');

    return (
        <div className="create-user-page">
            <div className="home-link">
                <Link to="/"><img className="home-icon home-icon-login" src="./images/home.png" alt="home link icon" /></Link>
            </div>
            <div className="main-create-user">
                <div className="create-user-image-box-1" ><img className="create-user-image create-user-image-1" src="./images/learningLogin1.png" alt="studying man image" /></div>
                <div className="middle">
                    <div className="create-user-template">
                        <div className="create-user-header">Stwórz konto</div>
                        <form className="create-user-form">
                            <div className="form-title madimi-one-regular">Imię</div>
                            <div className="form-text">
                                <img className="form-icon" src="./images/name.png" alt="person icon" />
                                <input type="text" name="imie" placeholdedr="Wprowadż nazwę użytkownika" value={name} onChange={(event) => {handleNameChange(event, setName)}}></input>
                            </div>
                            {nameErrorHTML != '' &&
                                <div className='error error-name'>{nameErrorHTML}</div>
                            }
                            <div className="form-title madimi-one-regular">Nazwisko</div>
                            <div className="form-text">
                                <img className="form-icon" src="./images/surname.png" alt="person icon" />
                                <input type="text" name="nazwisko" placeholdedr="Wprowadż nazwisko użytkownika" value={surname} onChange={(event) => {handleSurnameChange(event, setSurname)}}></input>
                            </div>
                            {surnameErrorHTML != '' &&
                                <div className='error error-surname'>{surnameErrorHTML}</div>
                            }
                            <div className="form-title madimi-one-regular">Email</div>
                            <div className="form-text">
                                <img className="form-icon" src="./images/user.png" alt="person icon" />
                                <input type="email" name="email" placeholdedr="Wprowadż email" value={email} onChange={(event) => {handleEmailChange(event, setEmail)}}></input>
                            </div>
                            {emailErrorHTML != '' && 
                                <div className='error error-email'>{emailErrorHTML}</div>                            
                            }
                            <div className="form-title madimi-one-regular">Hasło</div>
                            <div className="form-text">
                                <img className="form-icon" src="./images/lock.png" alt="person icon" />
                                <input type="password" name="password" placeholdedr="Wprowadż hasło" value={password} onChange={(event) => {handlePasswordChange(event, setPassword)}}></input>
                            </div>
                            {passwordErrorHTML != '' &&
                                <div className='error error-password'>{passwordErrorHTML}</div>
                            }
                        </form>
                        <button className="button create-user-button" onClick={() => {handleRegister(name, surname, email, password, setName, setSurname, setEmail, setPassword, nameErrorHTML, surnameErrorHTML, emailErrorHTML, passwordErrorHTML, setNameErrorHTML, setSurnameErrorHTML, setEmailErrorHTML, setPasswordErrorHTML, navigate)}}>Zarejestruj</button>
                    </div>
                </div>
                <div className="create-user-image-box-2" ><img className="create-user-image create-user-image-2" src="./images/learningLogin2.png" alt="studying man image" /></div>
            </div>
        </div>
    )
}