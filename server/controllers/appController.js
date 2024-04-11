const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const InformacjeUczniowie = require('../models/User');
const InformacjeKursy = require('../models/Courses');



module.exports.hours_get = async (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'new_secret_token_korepetycje_online', async (err, decodedToken) => {
            if (err) {
                console.log('Error while verifying token: ', err);
                return res.status(401).send('Invalid token, user cannot be authenticated');
            } else {
                try {
                    const data = await InformacjeKursy.findOne({ _id: '661660348e15a8d3096dd185' });
                    return res.json(data);
                } catch (error) {
                    console.error('Error while fetching data:', error);
                    return res.status(500).send('Internal server error');
                }
            }
        });
    } else {
        console.log('No token provided');
        return res.status(400).send('Token is required for user authorization');
    }
};

module.exports.logout_post = async(req, res) => {
    let email = '';
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'new_secret_token_korepetycje_online', (err, decodedToken) => {
        if (err) {
            console.log('Error while veryfying token: ', err);
            res.send(false);
        } else {
            email = decodedToken.email
        }})
    }

    console.log('Deleting jwt...'); 
    res.clearCookie('jwt')
    res.redirect('/');

    try {
        await InformacjeUczniowie.findOneAndUpdate({ email: email }, { $push: { actions:  'logout' }});
        console.log('New action added successfully');
    } 
    catch (err) {
        console.log(err)
    }
}


//LOGIC FOR ADDING COURSE AVAILABLE
module.exports.deleteCourse_post = async(req, res) => { 
    const { id, hour, lengthNumber, day } = req.body
    console.log('data to send on server: ', id, hour, lengthNumber, day)
    console.log
    let email = '';
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'new_secret_token_korepetycje_online', (err, decodedToken) => {
        if (err) {
            console.log('Error while veryfying token', err);
            res.send(false);
        } else {
            email = decodedToken.email
        }
    })} else {
        console.log('No token is active on website');
        res.send(false);
    }

    console.log('Deleting course...')

    try {
        const user = await InformacjeUczniowie.findOne({ email: email });
        let newCourses = user.courses;
        newCourses = newCourses.filter(course => course._id != id);
        
        user.courses = newCourses;
        user.save()
            .catch(error => {
                console.error("Error updating user", error);
            });
    }
    catch(err) {
        console.log(err)
    }

    try {
        await InformacjeUczniowie.findOneAndUpdate({ email: email }, { $push: { actions:  'deleted course' }});
        console.log('New action added successfully');
    } 
    catch (err) {
        console.log(err)
    }

    try {
        let course = await InformacjeKursy.findOneAndUpdate({ _id: '661660348e15a8d3096dd185' })
        let indexesArray = [];
        let courseDay;
        let weekday;
        switch(day) {
            case 'Poniedziałek':
                courseDay = course.monday;
                weekday = 'monday';
                break;
            case 'Wtorek':
                courseDay = course.tuesday;
                weekday = 'tuesday';
                break;
            case 'Środa':
                courseDay = course.wednesday;
                weekday = 'wednesday';
                break;
            case 'Czwartek':
                courseDay = course.thursday;
                weekday = 'thursday';
                break;
            case 'Piątek':
                courseDay = course.friday;
                weekday = 'friday';
                break;
            default: 
                break;
        }

        for (let i = 0; i < 24; i++) {
            if(courseDay[i].hour == hour){
                for(let j = i; j < i + lengthNumber; j++){
                    indexesArray.push(j);
                }
                break;
            }
        }

        let newArray = []; 
        courseDay.forEach((element, index) => {
            if(indexesArray.includes(index)) {
                newArray.push({
                    hour: element.hour,
                    numberOfAvailable: element.numberOfAvailable + 1, //  numberOfAvailable: element.numberOfAvailable + 1;
                    _id: element._id,
                });
            } else {
                newArray.push(element)
            }
        });
        
        switch(weekday){
            case 'monday':
                await InformacjeKursy.findOneAndUpdate(
                    { _id: '661660348e15a8d3096dd185' }, 
                    { monday: newArray },
                    { new: true }
                );
                break;
            case 'tuesday':
                await InformacjeKursy.findOneAndUpdate(
                    { _id: '661660348e15a8d3096dd185' }, 
                    { tuesday: newArray },
                    { new: true }
                );
                break;
            case 'wednesday':
                await InformacjeKursy.findOneAndUpdate(
                    { _id: '661660348e15a8d3096dd185' }, 
                    { wednesday: newArray },
                    { new: true }
                );
                break;
            case 'thursday':
                await InformacjeKursy.findOneAndUpdate(
                    { _id: '661660348e15a8d3096dd185' }, 
                    { thursday: newArray },
                    { new: true }
                );
                break;
            case 'friday':
                await InformacjeKursy.findOneAndUpdate(
                    { _id: '661660348e15a8d3096dd185' }, 
                    { friday: newArray },
                    { new: true }
                );
                break;
            default: 
                break;
        }
        console.log('Updated courses');
    }
    catch(err) {
        console.log(err)
    }
}


// ADD LOGIC THAT TAKES AWAY 1 ACCESABLE HOUR AND ADDS BACK TO DELETED HOUR
module.exports.changeCourseDate_post = async(req, res) => {
    let email = '';
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'new_secret_token_korepetycje_online', (err, decodedToken) => {
        if (err) {
            console.log('Error while veryfying token', err);
            res.send(false);
        } else {
            email = decodedToken.email
        }
    })} else {
        console.log('No token is active on website');
        res.send(false);
    }
   
    console.log('Changing course date...')
    const { hour, length, day, id } = req.body
    
    try {
        const user = await InformacjeUczniowie.findOne({ email: email });
        let newCourses = user.courses;
        
        for(let i = 0; i < user.courses.length; i++) {
            if(user.courses[i]._id == id) {
                user.courses[i] = {
                    hour: hour,
                    length :length,
                    day: day,
                    number: user.courses[i].number,
                    courseType: user.courses[i].courseType,
                    _id: id,
                }
            }
        }
        user.courses = newCourses;
        user.save()
            .catch(error => {
                console.error("Error updating user", error);
            });
    } 
    catch (err) {
        console.log(err)
    }

    try {
        await InformacjeUczniowie.findOneAndUpdate({ email: email }, { $push: { actions:  'changed course' }});
        console.log('New action added successfully');
    } 
    catch (err) {
        console.log(err)
    }
}

module.exports.data_get = async (req, res) => {
    token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'new_secret_token_korepetycje_online', async (err, decodedToken) => {
            if (err) {
                console.log('Error while veryfying token: ', err);
                res.status(200).send('Wrong token, user cannot be authenticated');
                console.log(err);
            } else {
                const user = await InformacjeUczniowie.findOne({ email: decodedToken.email });
                res.send(user)
            }
        })
    } else {
        console.log('No token is active on website');
        res.status(400).send('Token is required for app user to be authoritized')
    }
} 

module.exports.main_get = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (token) {
            jwt.verify(token, 'new_secret_token_korepetycje_online', (err, decodedToken) => {
            if (err) {
                console.log('Error while veryfying token', err);
                res.status(200).send('Wrong token, user cannot be authenticated');
                res.send(false);
            } else {
                res.send(true);
            }
        })} else {
            console.log('No token is active on website');
            res.send(false);
        }
    } 
    catch (err) {
        console.log(err)
    }
}

module.exports.login_post = async (req, res) => {
    console.log('Logging in...');
    const email = req.body.email
    const userFound = await InformacjeUczniowie.findOne({ email: email });

    if (userFound) {
        bcrypt.compare(req.body.password, userFound.password, (err, result) => {
            if (err) {
                console.log('Error while veryfying data', err);
            }
            if (result) {
                const user = {
                    id: req.body.id,
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    password: req.body.password,
                }

                const secret_key = 'new_secret_token_korepetycje_online';
                const expiresIn = 60 * 60;
                const token = jwt.sign(user, secret_key, { expiresIn });
                
                res.cookie('jwt', token, { httpOnly: true, secure: true , });

                console.log('Logged successfully');
                res.json({message: 'successfull'});
            } else {
                res.status(401).json({message: 'unsuccessfull'})
                console.log('Incorrect password')
            }
        })
    } else {
        res.status(401).json({message: 'unsuccessfull'})
        console.log('Incorrect email')
    }

    try {
        await InformacjeUczniowie.findOneAndUpdate({ email: email }, { $push: { actions:  'login' }});
        console.log('New action added successfully');
    } 
    catch (err) {
        console.log(err)
    }
}



// BUYING COURSE ACTION (WITH DATE AND COURSE DATA)
module.exports.buying_post = async (req, res) => {
    const { hour, length, lengthNumber, day, number, courseType } = req.body

    let email = '';
    const token = req.cookies.jwt;
    console.log('')
    if (token) {
        jwt.verify(token, 'new_secret_token_korepetycje_online', (err, decodedToken) => {
        if (err) {
            console.log('Error while veryfying token', err);
            res.send(false);
        } else {
            email = decodedToken.email                
        }
    })} else {
        console.log('No token is active on website');
        res.send(false);
    }
   
    console.log('Posting buy-course action to database...')
    
    try {
        await InformacjeUczniowie.findOneAndUpdate({ email: email }, { $push: { courses: { hour, length, day, number, courseType } } }, { new: true });

        console.log('New course added successfully');
    } 
    catch (err) {
        console.log(err)
    }

    try {
        const updatedUser = await InformacjeUczniowie.findOneAndUpdate({ email: email }, { $push: { actions:  'bougth course' }});
        res.status(202).json(updatedUser);
        console.log('New action added successfully');
    } 
    catch (err) {
        console.log(err)
    }

    try {
        let course = await InformacjeKursy.findOneAndUpdate({ _id: '661660348e15a8d3096dd185' })
        let indexesArray = [];
        let courseDay;
        let weekday;
        switch(day) {
            case 'Poniedziałek':
                courseDay = course.monday;
                weekday = 'monday';
                break;
            case 'Wtorek':
                courseDay = course.tuesday;
                weekday = 'tuesday';
                break;
            case 'Środa':
                courseDay = course.wednesday;
                weekday = 'wednesday';
                break;
            case 'Czwartek':
                courseDay = course.thursday;
                weekday = 'thursday';
                break;
            case 'Piątek':
                courseDay = course.friday;
                weekday = 'friday';
                break;
            default: 
            break;
        }

        for (let i = 0; i < 24; i++) {
            if(courseDay[i].hour == hour){
                for(let j = i; j < i + lengthNumber; j++){
                    indexesArray.push(j);
                }
                break;
            }
        }

        let newArray = []; 
        courseDay.forEach((element, index) => {
            if(indexesArray.includes(index)) {
                newArray.push({
                    hour: element.hour,
                    numberOfAvailable: element.numberOfAvailable - 1,
                    _id: element._id,
                });
            } else {
                newArray.push(element)
            }
        });
        
        switch(weekday){
            case 'monday':
                await InformacjeKursy.findOneAndUpdate(
                    { _id: '661660348e15a8d3096dd185' }, 
                    { monday: newArray },
                    { new: true }
                );
                break;
            case 'tuesday':
                await InformacjeKursy.findOneAndUpdate(
                    { _id: '661660348e15a8d3096dd185' }, 
                    { tuesday: newArray },
                    { new: true }
                );
                break;
            case 'wednesday':
                await InformacjeKursy.findOneAndUpdate(
                    { _id: '661660348e15a8d3096dd185' }, 
                    { wednesday: newArray },
                    { new: true }
                );
                break;
            case 'thursday':
                await InformacjeKursy.findOneAndUpdate(
                    { _id: '661660348e15a8d3096dd185' }, 
                    { thursday: newArray },
                    { new: true }
                );
                break;
            case 'friday':
                await InformacjeKursy.findOneAndUpdate(
                    { _id: '661660348e15a8d3096dd185' }, 
                    { friday: newArray },
                    { new: true }
                );
                break;
            default: 
                break;
        }
        console.log('Updated courses');
    }
    catch(err) {
        console.log(err)
    }
}



module.exports.register_post = async (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'new_secret_token_korepetycje_online', (err, decodedToken) => {
        if (err) {
            console.log('Error while veryfying token', err);
            res.send(false);
        } else {
            email = decodedToken.email
        }})
    }

    console.log('Registering in...');
    const salt = await bcrypt.genSalt();
    const { name, surname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new InformacjeUczniowie({
        name: name,
        surname: surname,
        email: email,
        password: hashedPassword, 
        firstCourseDate: new Date(),
        actions: ['registered'],
    });

    try {
        await newUser.save();
    }
    catch (err) {
        console.log(err)
    }
}














/* 

const scheduleData = [
    _id: ObjectId('661660348e15a8d3096dd185'), 
    {   
    "Monday": [
        { "hour": "16:00", "numberOfAvailable": 1 },
        { "hour": "16:15", "numberOfAvailable": 1 },
        { "hour": "16:30", "numberOfAvailable": 1 },
        { "hour": "16:45", "numberOfAvailable": 1 },
        { "hour": "17:00", "numberOfAvailable": 1 },
        { "hour": "17:15", "numberOfAvailable": 1 },
        { "hour": "17:30", "numberOfAvailable": 1 },
        { "hour": "17:45", "numberOfAvailable": 1 },
        { "hour": "18:00", "numberOfAvailable": 1 },
        { "hour": "18:15", "numberOfAvailable": 1 },
        { "hour": "18:30", "numberOfAvailable": 1 },
        { "hour": "18:45", "numberOfAvailable": 1 },
        { "hour": "19:00", "numberOfAvailable": 1 },
        { "hour": "19:15", "numberOfAvailable": 1 },
        { "hour": "19:30", "numberOfAvailable": 1 },
        { "hour": "19:45", "numberOfAvailable": 1 },
        { "hour": "20:00", "numberOfAvailable": 1 },
        { "hour": "20:15", "numberOfAvailable": 1 },
        { "hour": "20:30", "numberOfAvailable": 1 },
        { "hour": "20:45", "numberOfAvailable": 1 }
      ]
    },
    {
      "Tuesday": [
        { "hour": "16:00", "numberOfAvailable": 1 },
        { "hour": "16:15", "numberOfAvailable": 1 },
        { "hour": "16:30", "numberOfAvailable": 1 },
        { "hour": "16:45", "numberOfAvailable": 1 },
        { "hour": "17:00", "numberOfAvailable": 1 },
        { "hour": "17:15", "numberOfAvailable": 1 },
        { "hour": "17:30", "numberOfAvailable": 1 },
        { "hour": "17:45", "numberOfAvailable": 1 },
        { "hour": "18:00", "numberOfAvailable": 1 },
        { "hour": "18:15", "numberOfAvailable": 1 },
        { "hour": "18:30", "numberOfAvailable": 1 },
        { "hour": "18:45", "numberOfAvailable": 1 },
        { "hour": "19:00", "numberOfAvailable": 1 },
        { "hour": "19:15", "numberOfAvailable": 1 },
        { "hour": "19:30", "numberOfAvailable": 1 },
        { "hour": "19:45", "numberOfAvailable": 1 },
        { "hour": "20:00", "numberOfAvailable": 1 },
        { "hour": "20:15", "numberOfAvailable": 1 },
        { "hour": "20:30", "numberOfAvailable": 1 },
        { "hour": "20:45", "numberOfAvailable": 1 }
      ]
    },
    {
      "Wednesday": [
        { "hour": "16:00", "numberOfAvailable": 1 },
        { "hour": "16:15", "numberOfAvailable": 1 },
        { "hour": "16:30", "numberOfAvailable": 1 },
        { "hour": "16:45", "numberOfAvailable": 1 },
        { "hour": "17:00", "numberOfAvailable": 1 },
        { "hour": "17:15", "numberOfAvailable": 1 },
        { "hour": "17:30", "numberOfAvailable": 1 },
        { "hour": "17:45", "numberOfAvailable": 1 },
        { "hour": "18:00", "numberOfAvailable": 1 },
        { "hour": "18:15", "numberOfAvailable": 1 },
        { "hour": "18:30", "numberOfAvailable": 1 },
        { "hour": "18:45", "numberOfAvailable": 1 },
        { "hour": "19:00", "numberOfAvailable": 1 },
        { "hour": "19:15", "numberOfAvailable": 1 },
        { "hour": "19:30", "numberOfAvailable": 1 },
        { "hour": "19:45", "numberOfAvailable": 1 },
        { "hour": "20:00", "numberOfAvailable": 1 },
        { "hour": "20:15", "numberOfAvailable": 1 },
        { "hour": "20:30", "numberOfAvailable": 1 },
        { "hour": "20:45", "numberOfAvailable": 1 }
      ]
    },
    {
      "Thursday": [
        { "hour": "16:00", "numberOfAvailable": 1 },
        { "hour": "16:15", "numberOfAvailable": 1 },
        { "hour": "16:30", "numberOfAvailable": 1 },
        { "hour": "16:45", "numberOfAvailable": 1 },
        { "hour": "17:00", "numberOfAvailable": 1 },
        { "hour": "17:15", "numberOfAvailable": 1 },
        { "hour": "17:30", "numberOfAvailable": 1 },
        { "hour": "17:45", "numberOfAvailable": 1 },
        { "hour": "18:00", "numberOfAvailable": 1 },
        { "hour": "18:15", "numberOfAvailable": 1 },
        { "hour": "18:30", "numberOfAvailable": 1 },
        { "hour": "18:45", "numberOfAvailable": 1 },
        { "hour": "19:00", "numberOfAvailable": 1 },
        { "hour": "19:15", "numberOfAvailable": 1 },
        { "hour": "19:30", "numberOfAvailable": 1 },
        { "hour": "19:45", "numberOfAvailable": 1 },
        { "hour": "20:00", "numberOfAvailable": 1 },
        { "hour": "20:15", "numberOfAvailable": 1 },
        { "hour": "20:30", "numberOfAvailable": 1 },
        { "hour": "20:45", "numberOfAvailable": 1 }
      ]
    },
    {
      "Friday": [
        { "hour": "16:00", "numberOfAvailable": 1 },
        { "hour": "16:15", "numberOfAvailable": 1 },
        { "hour": "16:30", "numberOfAvailable": 1 },
        { "hour": "16:45", "numberOfAvailable": 1 },
        { "hour": "17:00", "numberOfAvailable": 1 },
        { "hour": "17:15", "numberOfAvailable": 1 },
        { "hour": "17:30", "numberOfAvailable": 1 },
        { "hour": "17:45", "numberOfAvailable": 1 },
        { "hour": "18:00", "numberOfAvailable": 1 },
        { "hour": "18:15", "numberOfAvailable": 1 },
        { "hour": "18:30", "numberOfAvailable": 1 },
        { "hour": "18:45", "numberOfAvailable": 1 },
        { "hour": "19:00", "numberOfAvailable": 1 },
        { "hour": "19:15", "numberOfAvailable": 1 },
        { "hour": "19:30", "numberOfAvailable": 1 },
        { "hour": "19:45", "numberOfAvailable": 1 },
        { "hour": "20:00", "numberOfAvailable": 1 },
        { "hour": "20:15", "numberOfAvailable": 1 },
        { "hour": "20:30", "numberOfAvailable": 1 },
        { "hour": "20:45", "numberOfAvailable": 1 }
      ]
    },
    __v: 0,
  ];

// Loop through each day in the schedule data
scheduleData.forEach(async daySchedule => {
    // Get the day name (key) from the object
    const day = Object.keys(daySchedule)[0];
    // Get the schedule array for the day
    const schedule = daySchedule[day];

    try {
        // Create a new document in the MongoDB collection for each schedule entry
        await InformacjeKursy.create({ day, schedule });
        console.log(`Data for ${day} has been successfully inserted into the database.`);
    } catch (error) {
        console.error(`Error inserting data for ${day}: ${error}`);
    }
});

*/



