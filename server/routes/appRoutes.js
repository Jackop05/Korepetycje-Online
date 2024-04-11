const { Router } = require('express');
const appController = require('../controllers/appController.js'); 

const router = Router();


router.get('/main/api/data', appController.data_get);
router.get('/main/auth', appController.main_get);
router.get('/getReadyHours/data', appController.hours_get);
router.post('/logout', appController.logout_post);
router.post('/deleteCourse', appController.deleteCourse_post);
router.post('/changeCourseDate', appController.changeCourseDate_post);
router.post('/login', appController.login_post);
router.post('/meetingDetails', appController.buying_post);
router.post('/register', appController.register_post);

module.exports = router; 