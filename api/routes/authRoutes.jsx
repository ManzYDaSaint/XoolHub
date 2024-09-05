const router = require('express').Router();
const { signup, getAllSchools, login, updateSchool, generateOTP, verifyOTP, createResetSession, resetPassword, verifyUser } = require('../controller/authController.jsx');
const { localVariable } = require('../middleware/auth.jsx')


router.route('/signup').post(signup)
router.route('/schools').get(getAllSchools)

// ***** POST Methods
router.route('/authenticate').post((req, res) => res.end());
router.route('/login').post(login);

// ***** GET Methods
router.route('/school/:username').get();
router.route('/generateOTP').get(localVariable, generateOTP);
router.route('/verifyOTP').get(verifyOTP);
router.route('/createResetSession').get(createResetSession);


// ***** PUT Methods
router.route('/updateschool').put(updateSchool);
router.route('/resetPassword').put(resetPassword);


module.exports = router;