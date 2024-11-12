const router = require('express').Router();
const { 
    signup, 
    getAllSchools, 
    login, 
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
    deleteStudents,
    getSingleStudents,
    updateStudents,
    addFee,
    getFees,
    deleteFees,
    editFees,
    updateFees,
    getPays,
    getPayees,
    addPay,
    editPays,
    updatePays,
    deletePays,
    tverify,
    tLogout,
    getClassesTeacher,
    getSubjectsTeacher,
    getExamsTeacher,
    getTermsTeacher,
    getYearsTeacher,
    getStudentFilter,
    insertResults,
    getXs,
    getScores,
    updateScores,
    getClassStudents,
    getSingleStud,
    getFinancial,
    getSingleTeacher4Dashboard,
    getClassNSubjects,
    dashboardClassTeachers,
    getGenderPieTeacher,
    getTopStudents,
    getAverageScoreBySubject,
    countStudentByTeacher,
    getSchool,
    updateSchools,
    getReport,
    getCodes,
    getCodeScores,
    getStudentReport,
    getCT4Report,
    getCount,
    getSubjectPos,
    realPosition,
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
router.route('/resetPassword').put(resetPassword);



// ------- REGISTER ROUTES -----------
router.route('/signup').post(signup)
router.route('/updateschool').put(updateSchools);
// ------- REGISTER ROUTES -----------




// ------- LOGIN ROUTES -----------

router.route('/login').post(login);
router.route('/verify').post(verify);
router.route('/tverify').post(tverify);
router.route('/tlogout').post(tLogout);
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
router.route('/getstudent').get(getStudents);
router.route('/getsinglestudent/:id').get(getSingleStudents);
router.route('/deletstudent/:id').delete(deleteStudents);
router.route('/updatstudent/:id').put(updateStudents);

// ------- STUDENT ROUTES ----------- 





// ------- FEE ROUTES -----------

router.route('/addfee').post(addFee);
router.route('/getfee').get(getFees);
router.route('/deletfee/:id').delete(deleteFees);
router.route('/editfee/:id').get(editFees);
router.route('/updatfee/:id').put(updateFees);

// ------- FEE ROUTES ----------- 




// ------- PAYMENT ROUTES ----------- 

router.route('/getpay').get(getPays);
router.route('/getpayee/:id').get(getPayees);
router.route('/addpay').post(addPay);
router.route('/editpay/:id').get(editPays);
router.route('/updatpay/:id').put(updatePays);
router.route('/deletpay/:id').delete(deletePays);

// ------- PAYMENT ROUTES ----------- 




// ------- ENTRY ROUTES ----------- 
router.route('/getassignedclass').get(getClassesTeacher);
router.route('/getassignedsubject/:id').get(getSubjectsTeacher);
router.route('/getassignedexam').get(getExamsTeacher);
router.route('/getassignedterm').get(getTermsTeacher);
router.route('/getassignedyear').get(getYearsTeacher);
router.route('/getstudentfilter').post(getStudentFilter);
router.route('/insertresults').post(insertResults);
// ------- ENTRY ROUTES -----------




// ------- FILTER ROUTES -----------
router.route('/getx').post(getXs);
router.route('/getscore/:id').get(getScores);
router.route('/getscore/:id').get(getScores);
router.route('/updatscore/:id').put(updateScores);
// ------- FILTER ROUTES -----------




// ------- TEACHER STUDENNT ROUTES -----------
router.route('/getcs').get(getClassStudents);
router.route('/getsinglestud/:id').get(getSingleStud);
router.route('/getfin/:id').get(getFinancial);
// ------- TEACHER STUDENNT ROUTES -----------



// ------- TEACHER DASHBOARD ROUTES -----------
router.route('/getstd').get(getSingleTeacher4Dashboard);
router.route('/getcns').get(getClassNSubjects);
router.route('/getdct').get(dashboardClassTeachers);
// ------- TEACHER DASHBOARD ROUTES -----------




// ------- CHART ROUTES -----------
router.route('/getstudentgender/:id').get(getGenderPieTeacher);
router.route('/gettopstudent').get(getTopStudents);
router.route('/getavesubject').get(getAverageScoreBySubject);
router.route('/countstudentteacher').get(countStudentByTeacher);
// ------- CHART ROUTES -----------





// ------- ADMIN PROFILE ROUTES -----------
router.route('/admindet').get(getSchool);
// ------- ADMIN PROFILE ROUTES -----------



// ------- REPORT ROUTES -----------
// JCE
router.route('/getreport').post(getReport);
router.route('/getstudentreport').post(getStudentReport);
router.route('/getctreport').post(getCT4Report);
router.route('/countreport').post(getCount);
router.route('/subjectpos').post(getSubjectPos);
router.route('/realpos').post(realPosition);
// JCE
// ------- REPORT ROUTES -----------







module.exports = router;