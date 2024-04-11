import Reach from 'react'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'


// FOR NOW THIS OPTION IS LOCKED!!!!!


const handleChangeCourse = async (hour, length, day, id) => {
    const data = {
        hour, 
        length,
        day, 
        id,
    }

    try {
        const res = await fetch('/changeCourseDate', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
    }
    catch (err) {
        console.log(err);
    }
}

export default function MeetingDetails() {
    const { id } = useParams()

    const [ userData, setUserData ] = useState([])
    const [ hour, setHour ] = useState('18:00');
    const [ length, setLength ] = useState('45min');
    const [ day, setDay ] = useState('Pon');

    useEffect(() => {
        fetch('/main/api/data')
            .then((res) => res.json())
            .then((res) => setUserData(res))
    }, [])


    return (
        <div className="meeting-details-page">
            <div className="meeting-details-navbar">
                <Link to="/main"><img className="home-image" src="../images/home.png" alt="home page" /></Link>
                <div className="username">{userData.name} {userData.surname}</div>
            </div>
            <div className="meeting-page-main">
                <div className="meeting-page-options">
                    <div className="details-title">Detale zajęć</div>
                    <div className="meeting-main">
                        <div className="meeting-main-box">
                            <div className="details-hour">Godzina</div>
                            <select id="hour" name="hour" onChange={(event) => {setHour(event.target.value)}}>
                                <option value="18:00">18:00</option>
                                <option value="19:00">19:00</option>
                                <option value="20:00">20:00</option>
                                <option value="21:00">21:00</option>
                            </select>
                        </div>
                        <div className="meeting-main-box">
                            <div className="details-hour">Długość</div>
                            <select id="hour" name="hour" onChange={(event) => {setLength(event.target.value)}}>
                                <option value="45min">45min</option>
                                <option value="60min">60min</option>
                                <option value="75min">75min</option>
                                <option value="90min">90min</option>
                            </select>
                        </div>
                        <div className="meeting-main-box">
                            <div className="details-hour">Dzień tygodnia</div>
                            <select id="hour" name="hour" onChange={(event) => {setDay(event.target.value)}}>
                                <option value="Poniedziałek">Poniedziałek</option>
                                <option value="Wtorek">Wtorek</option>
                                <option value="Środa">Środa</option>
                                <option value="Czwartek">Czwartek</option>
                                <option value="Piątek">Piątek</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="meeting-page-changing-section">
                    <Link to="/main"><div className="meeting-page-right" onClick={() => {handleChangeCourse(hour, length, day, id)}}>Zmień termin zajęć</div></Link>
                </div>
            </div>
        </div>
    )
}