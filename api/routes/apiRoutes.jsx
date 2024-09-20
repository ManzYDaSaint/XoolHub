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
    addClass,
    getClasses,
    deleteClasses,
    editClasses,
    updateClasses,
    addTerm,
    getTerms,
    deleteTerms,
    editTerms,
    updateTerms,
    addGrade,
    getGrades,
    deleteGrades,
    editGrades,
    updateGrades,
    addJCE,
    getJCEs,
    deleteJCEs,
    editJCEs,
    updateJCEs,
    addMSCE,
    getMSCEs,
    deleteMSCEs,
    editMSCEs,
    updateMSCEs,
    addTeacher,
    getTeachers,
    deleteTeachers,
    editTeachers,
    updateTeachers,
    addAssignTeacher,
    getAssignTeachers,
    deleteAssignTeachers,
    addClassTeacher,
    getClassTeachers,
    deleteClassTeachers,
    getSingleTeachers,
    getTeacherClasses,
    getTeacherSubjects,
    addStudent,
    getStudents,
    trial,
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




// ------- CLASS ROUTES -----------

router.route('/addclass').post(addClass);
router.route('/getclass').get(getClasses);
router.route('/deletclass/:id').delete(deleteClasses);
router.route('/editclass/:id').get(editClasses);
router.route('/updatclass/:id').put(updateClasses);

// ------- CLASS ROUTES ----------- 



// ------- TERM ROUTES -----------

router.route('/addterm').post(addTerm);
router.route('/getterm').get(getTerms);
router.route('/deletterm/:id').delete(deleteTerms);
router.route('/editterm/:id').get(editTerms);
router.route('/updatterm/:id').put(updateTerms);

// ------- TERM ROUTES ----------- 



// ------- GRADE ROUTES -----------

router.route('/addgrade').post(addGrade);
router.route('/getgrade').get(getGrades);
router.route('/deletgrade/:id').delete(deleteGrades);
router.route('/editgrade/:id').get(editGrades);
router.route('/updatgrade/:id').put(updateGrades);

// ------- GRADE ROUTES ----------- 




// ------- JCE ROUTES -----------

router.route('/addjce').post(addJCE);
router.route('/getjce').get(getJCEs);
router.route('/deletjce/:id').delete(deleteJCEs);
router.route('/editjce/:id').get(editJCEs);
router.route('/updatjce/:id').put(updateJCEs);

// ------- JCE ROUTES ----------- 




// ------- MSCE ROUTES -----------

router.route('/addmsce').post(addMSCE);
router.route('/getmsce').get(getMSCEs);
router.route('/deletmsce/:id').delete(deleteMSCEs);
router.route('/editmsce/:id').get(editMSCEs);
router.route('/updatmsce/:id').put(updateMSCEs);

// ------- MSCE ROUTES ----------- 




// ------- TEACHER ROUTES -----------

router.route('/addteacher').post(addTeacher);
router.route('/getteacher').get(getTeachers);
router.route('/getsingleteacher/:id').get(getSingleTeachers);
router.route('/getteacherclasses/:id').get(getTeacherClasses);
router.route('/getteachersubjects/:id').get(getTeacherSubjects);
router.route('/deletteacher/:id').delete(deleteTeachers);
router.route('/editteacher/:id').get(editTeachers);
router.route('/updatteacher/:id').put(updateTeachers);

// ------- TEACHER ROUTES ----------- 



// ------- ASSIGN TEACHER ROUTES -----------

router.route('/addassignteacher').post(addAssignTeacher);
router.route('/getassignteacher').get(getAssignTeachers);
router.route('/deletassignteacher/:id').delete(deleteAssignTeachers);

// ------- ASSIGN TEACHER ROUTES ----------- 




// ------- CLASS TEACHER ROUTES -----------

router.route('/addclassteacher').post(addClassTeacher);
router.route('/getclassteacher').get(getClassTeachers);
router.route('/deletclassteacher/:id').delete(deleteClassTeachers);

// ------- CLASS TEACHER ROUTES ----------- 




// ------- STUDENT ROUTES -----------

router.route('/addstudent').post(addStudent);
router.route('/addnew').post(trial);
router.route('/getstudent').get(getStudents);
router.route('/deletclassteacher/:id').delete(deleteClassTeachers);

// ------- STUDENT ROUTES ----------- 


module.exports = router;