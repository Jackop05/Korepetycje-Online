import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcoming() {
    const handleHomeClick = () => {
        document.querySelector('.welcoming-page').scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }
    
    return (
        <div className="welcoming-page">
            <div className="navbar">
                <img className="home-icon" src="./images/home.png" alt="settings icon" onClick={handleHomeClick}/>
                <div className="navbar-right madimi-one-regular">
                    <Link to="/createUser"><button className="button-navbar">Zarejestruj</button></Link>
                    <Link to="/login"><button className="button-navbar">Zaloguj</button></Link>
                </div>
            </div>

            <div className="hero-section snap">
                <div  className="hero-left">
                    <div className="hero-description">Osiągnij sukces w nauce z naszymi  korepetytorami!</div>
                    <div className="hero-mini-description">Zapisz się na korepetycje już dziś i rozwijaj się dalej</div>
                </div>
                <div className="hero-right">
                    <img className="hero-image" src="./images/studyingPerson.png" alt="studying person image" />
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

            <div className="courses-section snap madimi-one-regular">
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

            <div className="footer-section snap">
                <div className="footer-left">
                <img className="instagram-icon footer-icon" src="./images/instagram.png" alt="instagram icon" />
                    <img className="facebook-icon footer-icon" src="./images/facebook.png" alt="facebook icon" />
                    <img className="tiktok-icon footer-icon" src="./images/tiktok.png" alt="instagram icon" />
                </div>
                <div className="footer-right">
                    <div className="phone-number">Zadzwoń ~ 696 100 061</div>
                </div>
            </div>
        </div>
    )
}