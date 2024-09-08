const router = require('express').Router();
const { 
    signup, 
    getAllSchools, 
    login, 
    updateSchool, 
    generateOTP, 
    verifyOTP, 
    createResetSession, 
    resetPassword, 
    addExam, 
    getExams, 
    deleteExams,
    updateExams,
    editExams,
} = require('../controller/apiController.jsx');
const { localVariable } = require('../middleware/api.jsx')


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




// ------- EXAM ROUTES -----------

router.route('/addexam').post(addExam);
router.route('/getexam').get(getExams);
router.route('/deletexam/:id').delete(deleteExams);
router.route('/editexam/:id').get(editExams);
router.route('/updatexam/:id').put(updateExams);

// ------- EXAM ROUTES ----------- 


module.exports = router;