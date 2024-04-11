import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import './styles/output.css';

import Welcoming from './templates/Welcoming';
import CreateUser from './templates/CreateUser';
import Login from './templates/Login';
import Settings from './templates/Settings';
import MeetingDetails from './templates/MeetingDetails';
import ChangeCourseDate from './templates/ChangeCourseDate';
import Main from './templates/Main';



const getMeetingRoute = (logged) => {
  if (logged) {
    return ( <Route exact path="/meetingDetails/:courseType" element={<MeetingDetails />} /> )
  } else {
    return ( <Route exact path="/meetingDetails/:courseType" element={<Navigate to="/login" />} /> )
  }
}

const getLoginRoute = (logged, change, setChange) => {
  if (logged) {
    return ( <Route exact path="/login" element={<Navigate to="/main" />}/> )
  } else {
    return ( <Route exact path="/login" element={<Login change={change} setChange={setChange} />} /> )
  }
}

const getChangeCourseRoute = (logged, change, setChange) => {
  if (logged) {
    return ( <Route exact path="/changeCourseDate/:id" element={<ChangeCourseDate />}/> )
  } else {
    return ( <Route exact path="/changeCourseDate/:id" element={<Login change={change} setChange={setChange} />} /> )
  }
}

const getMainRoute = (logged, setLogged, change, setChange) => {
    fetch('/main/auth')
      .then((res) => res.json())
      .then((res) => setLogged(res));

    if(logged == true) {
      return <Route exact path="/main" element={<Main change={change} setChange={setChange}/>}/>
    } else {
      return <Route exact path="/main" element={<Navigate to="/login" />}/>
    }
}

function App() {
  const [change, setChange] = useState(1);
  const [logged, setLogged] = useState(''); 


  return (
    <div className='App'>
      <Router>
        <Routes className="App">
          <Route exact path="/" element={<Welcoming />} />
          <Route exact path="/createUser" element={<CreateUser />} />
          { getLoginRoute(logged, change, setChange) }
          { getMeetingRoute(logged, change, setChange) }
          { getMainRoute(logged, setLogged, change, setChange) }
          { getChangeCourseRoute(logged, change, setChange) }
        </Routes>
      </Router>
    </div>
  );
}

export default App;