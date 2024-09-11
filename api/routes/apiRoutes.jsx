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
    addYear,
    getYears,
    deleteYears,
    editYears,
    updateYears,
    addSubject,
    getSubjects,
    deleteSubjects,
    editSubjects,
    updateSubjects,
    verify,
    Logout,
} = require('../controller/apiController.jsx');
const { localVariable } = require('../middleware/api.jsx')


router.route('/schools').get(getAllSchools)

// ***** POST Methods
router.route('/authenticate').post((req, res) => res.end());

// ***** GET Methods
router.route('/school/:username').get();
router.route('/generateOTP').get(localVariable, generateOTP);
router.route('/verifyOTP').get(verifyOTP);
router.route('/createResetSession').get(createResetSession);


// ***** PUT Methods
router.route('/updateschool').put(updateSchool);
router.route('/resetPassword').put(resetPassword);



// ------- REGISTER ROUTES -----------
router.route('/signup').post(signup)

// ------- REGISTER ROUTES -----------




// ------- LOGIN ROUTES -----------

router.route('/login').post(login);
router.route('/verify').post(verify);
router.route('/logout').post(Logout);

// ------- LOGIN ROUTES -----------




// ------- EXAM ROUTES -----------

router.route('/addexam').post(addExam);
router.route('/getexam').get(getExams);
router.route('/deletexam/:id').delete(deleteExams);
router.route('/editexam/:id').get(editExams);
router.route('/updatexam/:id').put(updateExams);

// ------- EXAM ROUTES ----------- 



// ------- YEAR ROUTES -----------

router.route('/addyear').post(addYear);
router.route('/getyear').get(getYears);
router.route('/deletyear/:id').delete(deleteYears);
router.route('/edityear/:id').get(editYears);
router.route('/updatyear/:id').put(updateYears);

// ------- YEAR ROUTES ----------- 



// ------- SUBJECT ROUTES -----------

router.route('/addsubject').post(addSubject);
router.route('/getsubject').get(getSubjects);
router.route('/deletsubject/:id').delete(deleteSubjects);
router.route('/editsubject/:id').get(editSubjects);
router.route('/updatsubject/:id').put(updateSubjects);

// ------- SUBJECT ROUTES ----------- 


module.exports = router;