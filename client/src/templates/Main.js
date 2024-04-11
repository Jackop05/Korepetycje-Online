import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'



const handleDeleteClick = async(id, hour, lengthNumber, day) => {
    const ifSure = window.confirm("Czy na pewno chcesz usunąć kurs?");
    if(ifSure) {
        try {
            const res = await fetch('/deleteCourse', {
                method: 'POST',
                body: JSON.stringify({id, hour, lengthNumber, day}),
                headers: { 'Content-Type': 'application/json' }
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}

const handleHomeClick = () => {
    document.querySelector('.main-page').scrollTo({top: 0, left: 0, behavior: 'smooth'})
}

const handleChangeCourseClick = async(id) => {
    try {
        const res = await fetch('/changeCourseDate/api', {
            method: 'POST',
            body: JSON.stringify({id}),
            headers: { 'Content-Type': 'application/json' }
        });
    }
    catch (err) {
        console.log(err);
    }
}

const handleLogout = async(change, setChange) => {
    try {
        const res = await fetch('/logout', {
            method: 'POST',
            body: JSON.stringify(),
            headers: { 'Content-Type': 'application/json' }
        });
    }
    catch (err) {
        console.log(err);
    }
    (change === 1) ? setChange(0) : setChange(1)
}

const getUsersCourses = (courses) => {
    const length = courses.length;
    if(length > 0) {
        let newArray = [];
        for(let i = 0; i < length; i++) {
            let lengthNumber = 0;
            switch(courses[i].length) {
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
            console.log('data to send: ', courses[i]._id, courses[i].hour, lengthNumber, courses[i].day)
            newArray.push(
                <div className="user-course">
                    <div className="user-course-left">
                        <div className="subject-box">
                            <div className="subject">{courses[i].courseType}</div>
                            <img className="course-image-user-courses course-image-math" src="../images/math1.png" alt="math course image" /> 
                        </div>
                        <div className="subject-box-bottom">
                            <div className="course-date">{courses[i].day} {courses[i].hour}</div>
                            <div className="course-length">{courses[i].length}</div>
                        </div>
                    </div>
                    <div className="user-course-right">
                        <button className="button cancel-meeting-button" onClick={() => {handleDeleteClick(courses[i]._id, courses[i].hour, lengthNumber, courses[i].day); window.location.reload(true);}}>Odwołaj zajęcia</button>
                    </div>
                </div>
            )
        }
        newArray.join()
        return (
            <div className="user-courses-section snap">
                { newArray }
            </div>
        )
    } else {
        return (
            <div className='no-courses'></div>
        )
    }
}

export default function Main(props) { 
        const [ data, setData ] = useState([])

        useEffect(() => {
            fetch('/main/api/data')
                .then((res) => res.json())
                .then((res) => setData(res))
        }, []);
       
        let courses;
        if ( data.courses == undefined ) {
            courses = [];
        } else {
            courses = [...data.courses];
        }

        return (
            <div className="main-page">
                <div className="navbar">
                <img className="home-icon" src="../images/home.png" alt="settings icon" onClick={handleHomeClick} />
                    <div className="navbar-right">
                        <Link to="/"><div className="log-out" onClick={() => {handleLogout(props.change, props.setChange)}}>Wyloguj</div></Link>
                        <div className="username">{data.name} {data.surname}</div>
                    </div>
                </div>

                <div className="hero-section snap">
                    <div  className="hero-left">
                        <div className="hero-description">Osiągnij sukces w nauce z naszymi  korepetytorami!</div>
                        <div className="hero-mini-description">Zapisz się na korepetycje już dziś i rozwijaj się dalej</div>
                    </div>
                    <div className="hero-right">
                        <img className="hero-image" src="../images/studyingPerson.png" alt="studying person image" />
                    </div>
                </div>

                <div className="question-section-bg snap ">
                    <div className="questions-section">
                        <div className="questions-left">
                            <div className="question question-1">Chcesz poprawić ocenę?</div>
                            <div className="question question-3">Odrobić zadanie domowe?</div>
                            <div className="question question-5">Nadrobić zaległości?</div>
                        </div>
                        <div className="questions-right">
                            <div className="question question-2">Przygotować się do matury?</div>
                            <div className="question question-4">Przygotować się do egzaminu?</div>
                            <div className="question question-6">Przygotować się do poprawki?</div>
                        </div>
                    </div>
                </div>

                <div className="courses-section snap">
                    <div className="courses">
                    <Link to="/meetingDetails/math1">
                        <div className="course">
                            <div className="course-title">Matematyka szkoła podstawowa</div>
                            <div className="course-down">
                                <img className="course-image course-image-math" src="./images/math1.png" alt="math1 course image" /> 
                                <div className="course-cost">50zł/h</div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/meetingDetails/math2">
                        <div className="course">
                            <div className="course-title">Matematyka podstawa liceum</div>
                            <div className="course-down">
                                <img className="course-image course-image-math" src="./images/math2.png" alt="math2 course image" /> 
                                <div className="course-cost">50zł/h</div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/meetingDetails/math3">
                        <div className="course">
                            <div className="course-title">Matematyka rozszerzenie liceum</div>
                            <div className="course-down">
                                <img className="course-image course-image-math" src="./images/math3.png" alt="math3 course image" /> 
                                <div className="course-cost">50zł/h</div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/meetingDetails/physics1">
                        <div className="course">
                            <div className="course-title">Fizyka szkoła podstawowa</div>
                            <div className="course-down">
                                <img className="course-image course-image-math" src="./images/physics1.png" alt="physics1 course image" /> 
                                <div className="course-cost">50zł/h</div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/meetingDetails/physics2">
                        <div className="course">
                            <div className="course-title">Fizyka podstawa liceum</div>
                            <div className="course-down">
                                <img className="course-image course-image-math" src="./images/physics2.png" alt="physics2 course image" /> 
                                <div className="course-cost">50zł/h</div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/meetingDetails/physics3">
                        <div className="course">
                            <div className="course-title">Fizyka rozszerzenie liceum</div>
                            <div className="course-down">
                                <img className="course-image course-image-math" src="./images/physics3.png" alt="physics1 course image" /> 
                                <div className="course-cost">50zł/h</div>
                            </div>
                        </div>
                    </Link>
                    </div>
                </div>

                <div className="question-courses-section snap">
                    <div className="question-courses-text">Zobacz swoje zajęcia</div>
                    {courses.length == 0 &&
                        <div className="no-classes">Nie masz jeszcze wykupionych żadnych zajęć</div>
                    }
                </div>

                { getUsersCourses(courses) }

                <div className="footer-section snap">
                    <div className="footer-left">
                        <img className="instagram-icon footer-icon" src="../images/instagram.png" alt="instagram icon" />
                        <img className="facebook-icon footer-icon" src="../images/facebook.png" alt="facebook icon" />
                        <img className="tiktok-icon footer-icon" src="../images/tiktok.png" alt="instagram icon" />
                    </div>
                    <div className="footer-right">
                        <div className="phone-number">Zadzwoń ~ 696 100 061</div>
                    </div>
                </div>
            </div>
        )
    
}