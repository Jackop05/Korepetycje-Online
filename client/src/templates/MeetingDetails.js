import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';



const handleBuyCourse = async (hour, length, day, number, newType) => {
    let courseType = '';
    switch (newType) {
        case 'math1': 
            courseType = 'Matematyka szkoła podstawowa'; 
            break;
        case 'math2': 
            courseType = 'Matematyka liceum podstawa'; 
            break;
        case 'math3': 
            courseType = 'Matematyka liceum rozszerzenie'; 
            break;
        case 'physics1': 
            courseType = 'Fizyka szkoła podstawowa'; 
            break;
        case 'physics2': 
            courseType = 'Fizyka liceum podstawa'; 
            break;
        case 'physics3': 
            courseType = 'Fizyka liceum roszerzenie'; 
            break;
        default: 
            courseType = 'Korepetycje';
            break;
    }

    let lengthNumber = 0;
    switch(length) {
        case '45min':
            lengthNumber = 3;
            break;
        case '60min':
            lengthNumber = 4;
            break;
        case '75min':
            lengthNumber = 5;
            break;
        case '90min':
            lengthNumber = 6;
            break;
        default: 
            break;
    }

    console.log('type: ', courseType);

    const data = {
        hour, 
        length,
        lengthNumber, 
        day, 
        number,
        courseType,
    }

    try {
        const res = await fetch('/meetingDetails', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
    }
    catch (err) {
        console.log(err);
    }
}

const displayHours = (weekday, hoursData, setHour, hour) => {
    let weekdayArray;
    let array;
    if(hoursData == undefined) {
        array = <option value="no-options-available">No options available</option>
    } else {
        switch(weekday) {
            case 'Poniedziałek':
                weekdayArray = hoursData.monday;
                break;
            case 'Wtorek':
                weekdayArray = hoursData.tuesday;
                break;
            case 'Środa':
                weekdayArray = hoursData.wednesday;
                break;
            case 'Czwartek':
                weekdayArray = hoursData.thursday;
                break;
            case 'Piątek':
                weekdayArray = hoursData.friday;
                break;
        }

        if(weekdayArray != undefined){
            array = weekdayArray.map((element) => {
                return (
                    <option className="hour-item" value={element}>{element}</option>
                )
            })
        } 
    }

    return (
        <select id="hour" name="hour" onChange={(event) => {setHour(event.target.value)}} value={hour}>
            {array}
        </select>
    )
}

const setHours = (day, length, readyHours, setHoursData, setHour) => {
    console.log("ReadyHours: ", readyHours);
    let newHour = '18:00';
    let i = 0;
    if(readyHours != undefined) {
        if(day == "Poniedziałek") {
            while(true) {
                if(readyHours.monday[i] == undefined) {
                    break;
                } else if(readyHours.monday[i].numberOfAvailable > 0){
                    newHour = readyHours.monday[i].hour;
                    break;
                };
                i++;
            }
        }
        if(day == "Wtorek") {
            while(true) {
                if(readyHours.tuesday[i] == undefined) {
                    break;
                } else if(readyHours.tuesday[i].numberOfAvailable > 0){
                    newHour = readyHours.tuesday[i].hour;
                    break;
                };
                i++;
            }
        }
        if(day == "Środa") {
            while(true) {
                if(readyHours.wednesday[i] == undefined) {
                    break;
                } else if(readyHours.wednesday[i].numberOfAvailable > 0){
                    newHour = readyHours.wednesday[i].hour;
                    break;
                };
                i++;
            }
        }
        if(day == "Czwartek") {
            while(true) {
                if(readyHours.thursday[i] == undefined) {
                    break;
                } else if(readyHours.thursday[i].numberOfAvailable > 0){
                    newHour = readyHours.thursday[i].hour;
                    break;
                };
                i++;
            }
        }
        if(day == "Piątek") {
            while(true) {
                if(readyHours.friday[i] == undefined) {
                    break;
                } else if(readyHours.friday[i].numberOfAvailable > 0){
                    newHour = readyHours.friday[i].hour;
                    break;
                };
                i++;
            }
        }
    }
    setHour(newHour);

    let lengthNumber = 0;
    switch(length) {
        case '45min':
            lengthNumber = 3;
            break;
        case '60min':
            lengthNumber = 4;
            break;
        case '75min':
            lengthNumber = 5;
            break;
        case '90min':
            lengthNumber = 6;
            break;
        default: 
            break;
    }

    const mondayArray = readyHours?.monday;
    const tuesdayArray = readyHours?.tuesday;
    const wednesdayArray = readyHours?.wednesday;
    const thursdayArray = readyHours?.thursday;
    const fridayArray = readyHours?.friday;

    let newMonday = [], newTuesday = [], newWednesday = [], newThursday = [], newFriday = [];

    if(mondayArray !== undefined) {
        for(let i = 0; i < mondayArray.length - lengthNumber + 1; i++){
            let available = true;
            for(let j = 0; j < lengthNumber; j++){
                if(mondayArray[i + j].numberOfAvailable <= 0){
                    available = false;
                }
            }
            if(available){
                newMonday.push(mondayArray[i].hour);
            }
        }
        for(let i = 0; i < tuesdayArray.length - lengthNumber; i++){
            let available = true;
            for(let j = 0; j < lengthNumber; j++){
                if(tuesdayArray[i + j].numberOfAvailable <= 0){
                    available = false;
                }
            }
            if(available){
                newTuesday.push(tuesdayArray[i].hour);
            }
        }
        for(let i = 0; i < wednesdayArray.length - lengthNumber; i++){
            let available = true;
            for(let j = 0; j < lengthNumber; j++){
                if(wednesdayArray[i + j].numberOfAvailable <= 0){
                    available = false;
                }
            }
            if(available){
                newWednesday.push(wednesdayArray[i].hour);
            }
        }
        for(let i = 0; i < thursdayArray.length - lengthNumber; i++){
            let available = true;
            for(let j = 0; j < lengthNumber; j++){
                if(thursdayArray[i + j].numberOfAvailable <= 0){
                    available = false;
                }
            }
            if(available){
                newThursday.push(thursdayArray[i].hour);
            }
        }
        for(let i = 0; i < fridayArray.length - lengthNumber; i++){
            let available = true;
            for(let j = 0; j < lengthNumber; j++){
                if(fridayArray[i + j].numberOfAvailable <= 0){
                    available = false;
                }
            }
            if(available){
                newFriday.push(fridayArray[i].hour);
            }
        }
    }

    const newArray = { monday: [...newMonday], tuesday: [...newTuesday], wednesday: [...newWednesday], thursday: [...newThursday], friday: [...newFriday] };

    if(mondayArray !== undefined) {
        setHoursData(newArray)
    }
}



export default function MeetingDetails() {
    const { courseType } = useParams();

    const [ hoursData, setHoursData ] = useState([])
    const [ userData, setUserData ] = useState([]);
    const [ hour, setHour ] = useState();
    const [ length, setLength ] = useState('60min');
    const [ day, setDay ] = useState('Poniedziałek');
    const [ number, setNumber ] = useState('1');

    useEffect(() => {
        fetch('/getReadyHours/data')
            .then((res) => res.json())
            .then((res) => setHours(day, length, res, setHoursData, setHour))

        fetch('/main/api/data')
            .then((res) => res.json())
            .then((res) => setUserData(res));  
        
    }, [day, length]);

    

    
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
                            {(hoursData != undefined) &&
                                displayHours(day, hoursData, setHour, hour)
                            }
                        </div>
                        <div className="meeting-main-box">
                            <div className="details-hour">Długość</div>
                            <select id="hour" name="hour" onChange={(event) => {setLength(event.target.value)}} value={length}>
                                <option value="45min">45min</option>
                                <option value="60min">60min</option>
                                <option value="75min">75min</option>
                                <option value="90min">90min</option>
                            </select>
                        </div>
                        <div className="meeting-main-box">
                            <div className="details-hour">Dzień tygodnia</div>
                            <select id="hour" name="hour" onChange={(event) => {setDay(event.target.value)}} value={day}>
                                <option value="Poniedziałek">Poniedziałek</option>
                                <option value="Wtorek">Wtorek</option>
                                <option value="Środa">Środa</option>
                                <option value="Czwartek">Czwartek</option>
                                <option value="Piątek">Piątek</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="meeting-page-buying-section">
                    <div className="meeting-page-left">
                        <div className="error">Aktualnie strona jest w tarakcie przygotowywania płatności</div>
                        <div className="error">Aby umówić korepetycje skontaktuj się z numerem 696100061</div>
                        <div className="meeting-page-buying-text">Liczba wykupywanych zajęć:</div>
                        <div className="meeting-main-box">
                            <select id="buying-courses-count" name="buying-courses-count" onChange={(event) => {setNumber(event.target.value)}}>
                                <option value="1">1</option>
                            </select>
                        </div>
                    </div>
                    <Link to="/main"><div className="meeting-page-right" onClick={() => {handleBuyCourse(hour, length, day, number, courseType)}}>Kup zajęcia</div></Link>
                </div>
            </div>
        </div>
    )
}