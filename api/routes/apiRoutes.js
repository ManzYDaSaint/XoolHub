const router = require('express').Router();
const { route } = require('../app.js');
const { 
    signup, 
    login, 
    verifyOTP, 
    resendOTP,
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
    getStudentReport,
    getCT4Report,
    getCount,
    getSubjectPos,
    realPosition,
    getTByS,
    getRemarksByClassID,
    getJCEGrades,
    getMSCEGrades,
    deleteReports,
    deleteResults,
    StudentCounter,
    countMales,
    countFemales,
    countGenderForClass,
    genderByPercentage,
    TeacherCounter,
    countMalesTeacher,
    countFemalesTeacher,
    genderTeacherPercentage,
    sumPayments,
    sumPayDisMonth,
    getTuitions,
    getOutstandings,
    PaidByDaysPerTerm,
    PaidByClasses,
    countTermlyReports,
    PasswordUpdates,
    superVerify,
    superLogout,
    PasswordSuper,
    countXuls,
    getXuls,
    addSubscriptions,
    gotSubscriptions,
    deletePlan,
    editPlans,
    updatePlans,
    gotSubs,
    insertSubscription,
    checkSubStatus,
    checkPaidStatus,
    updateSuspended,
    gotSubscriptionPayments,
    updateStatuses,
    updateSchoolStatuses,
    countPrivateXuls,
    countPublicXuls,
    countSubscribedXuls,
    sumAmounts,
    paymentLineChart,
    sendOTP,
    insertEvent,
    getEvent,
    editEvents,
    updateEvents,
    deleteEvents,
    insertPromotion,
    getStudentPromos,
    updatePromotions,
    getBestStudents,
    getWorstStudents,
    avSubjectbyClassID,
    TeacherPasswordUpdates,
    addSubscriber,
    insertFeedback,
    getFeedbacko,
    getFeedbackRating,
    SubsByID,
    countOTeachers,
    countOStudents,
    getAdministrator,
    updateAdministrator,
    insertContacts,
    tsumPayments,
    gettOutstandings,
    gettTuitions,
    sumtPayDisMonth,
    tStudentCounter,
    gettPays,
    gettFees,
    gettStudents,
    insertExpense,
    getExpenses,
    editExpenses,
    updateExpenses,
    deleteExpenses,
    sumExpenses,
    countExpenses,
    AvgMonthly,
    Transactions,
    getChartLiner,
    getWebhook,
    postWebhook,
    testnet,
    getAdminExpenses,
    updateStatusEx,
} = require('../controller/apiController.js');


router.route('/count-schools').get(countXuls);
router.route('/count-o-teachers').get(countOTeachers);
router.route('/count-o-students').get(countOStudents);
router.route('/count-private-schools').get(countPrivateXuls);
router.route('/count-public-schools').get(countPublicXuls);
router.route('/count-subscribed').get(countSubscribedXuls);
router.route('/sum-amount').get(sumAmounts);
router.route('/get-schools').get(getXuls);
router.route('/payment-linechart').get(paymentLineChart);
router.route('/send-otp').post(sendOTP);

// ***** POST Methods
// router.route('/authenticate').post((req, res) => res.end());


// ***** GET Methods
router.route('/school/:username').get();
router.route('/verifyOTP').post(verifyOTP);
router.route('/resendOTP').post(resendOTP);
router.route('/createResetSession').get(createResetSession);


// ***** PUT Methods
router.route('/resetPassword').put(resetPassword);



// ------- SUPER ADMIN ROUTES -----------

router.route('/add-subscriptions').post(addSubscriptions);
router.route('/get-subscriptions').get(gotSubscriptions);
router.route('/delete-subscriptions/:id').delete(deletePlan);
router.route('/edit-subscriptions/:id').get(editPlans);
router.route('/update-subscriptions/:id').put(updatePlans);

// ------- SUPER ADMIN ROUTES -----------




// ------- SUBSCRIPTION ROUTES -----------

router.route('/got-subscription/:plan').get(gotSubs);
router.route('/get-subs').get(SubsByID);
router.route('/add-billing').post(insertSubscription);
router.route('/check-subscription-status').get(checkSubStatus);
router.route('/check-paid-status').get(checkPaidStatus);
router.route('/update-suspended-status').put(updateSuspended);
router.route('/get-subscription-payments').get(gotSubscriptionPayments);
router.route('/update-statuses/:id').put(updateStatuses);
router.route('/update-school-status/:id').put(updateSchoolStatuses);

// ------- SUBSCRIPTION ROUTES -----------





// ------- REGISTER ROUTES -----------
router.route('/signup').post(signup)
router.route('/updateschool').put(updateSchools);
router.route('/update-school-password').put(PasswordUpdates);
router.route('/update-teacher-password').put(TeacherPasswordUpdates);
router.route('/update-super-password').put(PasswordSuper);
router.route('/get-administrator').get(getAdministrator);
router.route('/update-administrator').put(updateAdministrator);
// ------- REGISTER ROUTES -----------



// ------- CONTACTS ROUTES -----------
router.route('/add-contacts').post(insertContacts);
// ------- CONTACTS ROUTES -----------




// ------- LOGIN ROUTES -----------

router.route('/login').post(login);
router.route('/verify').post(verify);
router.route('/tverify').post(tverify);
router.route('/superverify').post(superVerify);
router.route('/superlogout').post(superLogout);
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
router.route('/getjcegrade').get(getJCEGrades);
router.route('/getmscegrade').get(getMSCEGrades);
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
router.route('/count-teachers').get(TeacherCounter);
router.route('/count-male-teachers').get(countMalesTeacher);
router.route('/count-female-teachers').get(countFemalesTeacher);
router.route('/gender-percentage-teachers').get(genderTeacherPercentage);

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
router.route('/gettstudent').get(gettStudents);
router.route('/count-student').get(StudentCounter);
router.route('/countt-student').get(tStudentCounter);
router.route('/count-male').get(countMales);
router.route('/count-female').get(countFemales);
router.route('/count-gender-class').get(countGenderForClass);
router.route('/gender-percentage').get(genderByPercentage);
router.route('/getsinglestudent/:id').get(getSingleStudents);
router.route('/deletstudent/:id').delete(deleteStudents);
router.route('/updatstudent/:id').put(updateStudents);

// ------- STUDENT ROUTES ----------- 





// ------- FEE ROUTES -----------

router.route('/addfee').post(addFee);
router.route('/getfee').get(getFees);
router.route('/gettfee').get(gettFees);
router.route('/deletfee/:id').delete(deleteFees);
router.route('/editfee/:id').get(editFees);
router.route('/updatfee/:id').put(updateFees);

// ------- FEE ROUTES ----------- 




// ------- PAYMENT ROUTES ----------- 

router.route('/getpay').get(getPays);
router.route('/gettpay').get(gettPays);
router.route('/getpayee/:id').get(getPayees);
router.route('/addpay').post(addPay);
router.route('/editpay/:id').get(editPays);
router.route('/updatpay/:id').put(updatePays);
router.route('/deletpay/:id').delete(deletePays);
router.route('/count-payments').get(sumPayments);
router.route('/count-tpayments').get(tsumPayments);
router.route('/count-payment-month').get(sumPayDisMonth);
router.route('/countt-payment-month').get(sumtPayDisMonth);
router.route('/get-tuition').get(getTuitions);
router.route('/gett-tuition').get(gettTuitions);
router.route('/get-outstanding').get(getOutstandings);
router.route('/gett-outstanding').get(gettOutstandings);
router.route('/payment-days').get(PaidByDaysPerTerm);
router.route('/payment-classes').get(PaidByClasses);

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
router.route('/deleteresult').delete(deleteResults);
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
router.route('/insert-promotion').post(insertPromotion);
router.route('/get-student-promotion').post(getStudentPromos);
router.route('/update-pro').post(updatePromotions);
router.route('/best-students').get(getBestStudents);
router.route('/average-subject').post(avSubjectbyClassID);
router.route('/worst-students').get(getWorstStudents);
router.route('/getstudentreport').post(getStudentReport);
router.route('/getctreport').post(getCT4Report);
router.route('/countreport').post(getCount);
router.route('/subjectpos').post(getSubjectPos);
router.route('/realpos').post(realPosition);
router.route('/gettbs').post(getTByS);
router.route('/getremarkbyclass').post(getRemarksByClassID);
router.route('/deletereport').delete(deleteReports);
router.route('/count-reports').get(countTermlyReports);
// JCE
// ------- REPORT ROUTES -----------



// ------- EVENTS ROUTES -----------
router.route('/insert-event').post(insertEvent);
router.route('/get-event').get(getEvent);
router.route('/edit-event/:id').get(editEvents);
router.route('/update-event/:id').put(updateEvents);
router.route('/delete-event/:id').delete(deleteEvents);
// ------- EVENTS ROUTES -----------



// ------- SUBSCRIBE ROUTES -----------
router.route('/insert-subscribe').post(addSubscriber);
// ------- SUBSCRIBE ROUTES -----------



// ------- FEEDBACK ROUTES -----------
router.route('/insert-feedback').post(insertFeedback);
router.route('/get-feedback').get(getFeedbacko);
router.route('/get-feedback-rating').get(getFeedbackRating);
// ------- FEEDBACK ROUTES -----------




// ------- EXPENSE ROUTES -----------
router.route('/add-expense').post(insertExpense);
router.route('/get-expense').get(getExpenses);
router.route('/get-admin-expense').get(getAdminExpenses);
router.route('/update-expense-status/:id').put(updateStatusEx);
router.route('/edit-expense/:id').get(editExpenses);
router.route('/update-expense/:id').put(updateExpenses);
router.route('/delete-expense/:id').delete(deleteExpenses);
router.route('/sum-expense').get(sumExpenses);
router.route('/count-expense').get(countExpenses);
router.route('/avg-expense').get(AvgMonthly);
router.route('/transactions').get(Transactions);
router.route('/get-liner').get(getChartLiner);
// ------- EXPENSE ROUTES -----------





module.exports = router;