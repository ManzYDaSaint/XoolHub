import axios from 'axios';

axios.defaults.withCredentials = true;
const API = 'http://localhost:5000/api';

// const getSchools = () => axios.get(API_RL);
// const getSchool = (id) => axios.get(`${API_URL}${id}`);
// const deleteSchool = (id) => axios.delete(`${API_URL}${id}`);

// --------- REGISTER AXIOS -----------
const createSchool = (data) => axios.post(API + '/signup', data);
const updateSchool = (data) => axios.put(API + '/updateschool', data);
// --------- REGISTER AXIOS -----------





// --------- LOGIN AXIOS -----------

const Logon = (data) => axios.post(API + '/login', data);
const Verify = () => axios.post(API + '/verify');
const tVerify = () => axios.post(API + '/tverify');
const tLogout = () => axios.post(API + '/tlogout');
const Logout = () => axios.post(API + '/logout');

// --------- LOGIN AXIOS -----------





// --------- EXAM AXIOS -----------

const addExam = (data) => axios.post(API + '/addexam', data);
const getExam = () => axios.get(API + '/getexam');
const deleteExam = (id) => axios.delete(API + '/deletexam/' + id);
const editExam = (id) => axios.get(API + '/editexam/' + id);
const updateExam = (id, data) => axios.put(API + '/updatexam/' + id, data);

// --------- EXAM AXIOS -----------


// --------- YEAR AXIOS -----------

const addYear = (data) => axios.post(API + '/addyear', data);
const getYear = () => axios.get(API + '/getyear');
const deleteYear = (id) => axios.delete(API + '/deletyear/' + id);
const editYear = (id) => axios.get(API + '/edityear/' + id);
const updateYear = (id, data) => axios.put(API + '/updatyear/' + id, data);

// --------- YEAR AXIOS -----------


// --------- SUBJECT AXIOS -----------

const addSubject = (data) => axios.post(API + '/addsubject', data);
const getSubject = () => axios.get(API + '/getsubject');
const deleteSubject = (id) => axios.delete(API + '/deletsubject/' + id);
const editSubject = (id) => axios.get(API + '/editsubject/' + id);
const updateSubject = (id, data) => axios.put(API + '/updatsubject/' + id, data);

// --------- SUBJECT AXIOS -----------


// --------- CLASS AXIOS -----------

const addClass = (data) => axios.post(API + '/addclass', data);
const getClass = () => axios.get(API + '/getclass');
const deleteClass = (id) => axios.delete(API + '/deletclass/' + id);
const editClass = (id) => axios.get(API + '/editclass/' + id);
const updateClass = (id, data) => axios.put(API + '/updatclass/' + id, data);

// --------- CLASS AXIOS -----------



// --------- TERM AXIOS -----------

const addTerm = (data) => axios.post(API + '/addterm', data);
const getTerm = () => axios.get(API + '/getterm');
const deleteTerm = (id) => axios.delete(API + '/deletterm/' + id);
const editTerm = (id) => axios.get(API + '/editterm/' + id);
const updateTerm = (id, data) => axios.put(API + '/updatterm/' + id, data);

// --------- TERM AXIOS -----------




// --------- GRADE AXIOS -----------

const addGrade = (data) => axios.post(API + '/addgrade', data);
const getGrade = () => axios.get(API + '/getgrade');
const getJCEGrade = () => axios.get(API + '/getjcegrade');
const getMSCEGrade = () => axios.get(API + '/getmscegrade');
const deleteGrade = (id) => axios.delete(API + '/deletgrade/' + id);
const editGrade = (id) => axios.get(API + '/editgrade/' + id);
const updateGrade = (id, data) => axios.put(API + '/updatgrade/' + id, data);

// --------- GRADE AXIOS -----------




// --------- JCE AXIOS -----------

const addJCE = (data) => axios.post(API + '/addjce', data);
const getJCE = () => axios.get(API + '/getjce');
const deleteJCE = (id) => axios.delete(API + '/deletjce/' + id);
const editJCE = (id) => axios.get(API + '/editjce/' + id);
const updateJCE = (id, data) => axios.put(API + '/updatjce/' + id, data);

// --------- JCE AXIOS -----------




// --------- MSCE AXIOS -----------

const addMSCE = (data) => axios.post(API + '/addmsce', data);
const getMSCE = () => axios.get(API + '/getmsce');
const deleteMSCE = (id) => axios.delete(API + '/deletmsce/' + id);
const editMSCE = (id) => axios.get(API + '/editmsce/' + id);
const updateMSCE = (id, data) => axios.put(API + '/updatmsce/' + id, data);

// --------- MSCE AXIOS -----------




// --------- TEACHER AXIOS -----------

const addTeacher = (data) => axios.post(API + '/addteacher', data);
const getTeacher = () => axios.get(API + '/getteacher');
const getSingleTeacher = (id) => axios.get(API + '/getsingleteacher/' + id);
const getTeacherClasses = (id) => axios.get(API + '/getteacherclasses/' + id);
const getTeacherSubjects = (id) => axios.get(API + '/getteachersubjects/' + id);
const deleteTeacher = (id) => axios.delete(API + '/deletteacher/' + id);
const editTeacher = (id) => axios.get(API + '/editteacher/' + id);
const updateTeacher = (id, data) => axios.put(API + '/updatteacher/' + id, data);

// --------- TEACHER AXIOS -----------



// --------- ASSIGN TEACHER AXIOS -----------

const addAssignTeacher = (data) => axios.post(API + '/addassignteacher', data);
const getAssignTeacher = () => axios.get(API + '/getassignteacher');
const deleteAssignTeacher = (id) => axios.delete(API + '/deletassignteacher/' + id);

// --------- ASSIGN TEACHER AXIOS -----------



// --------- CLASS TEACHER AXIOS -----------

const addClassTeacher = (data) => axios.post(API + '/addclassteacher', data);
const getClassTeacher = () => axios.get(API + '/getclassteacher');
const deleteClassTeacher = (id) => axios.delete(API + '/deletclassteacher/' + id);

// --------- CLASS TEACHER AXIOS -----------




// --------- STUDENT AXIOS -----------

const addStudent = (data) => axios.post(API + '/addstudent', data);
const getStudent = () => axios.get(API + '/getstudent');
const getSingleStudent = (id) => axios.get(API + '/getsinglestudent/' + id);
const deleteStudent = (id) => axios.delete(API + '/deletstudent/' + id);
const updateStudent = (id, data) => axios.put(API + '/updatstudent/' + id, data);

// --------- STUDENT AXIOS -----------





// --------- FEE AXIOS -----------

const addFee = (data) => axios.post(API + '/addfee', data);
const getFee = () => axios.get(API + '/getfee');
const deleteFee = (id) => axios.delete(API + '/deletfee/' + id);
const editFee = (id) => axios.get(API + '/editfee/' + id);
const updateFee = (id, data) => axios.put(API + '/updatfee/' + id, data);

// --------- FEE AXIOS -----------





// --------- PAYMENT AXIOS -----------

const getPay = () => axios.get(API + '/getpay');
const getPayee = (id) => axios.get(API + '/getpayee/' + id);
const addPay = (data) => axios.post(API + '/addpay', data);
const editPay = (id) => axios.get(API + '/editpay/' + id);
const updatePay = (id, data) => axios.put(API + '/updatpay/' + id, data);
const deletePay = (id) => axios.delete(API + '/deletpay/' + id);

// --------- PAYMENT AXIOS -----------





// --------- ENTRY AXIOS -----------
const getAssignClass = () => axios.get(API + '/getassignedclass');
const getAssignSubject = (id) => axios.get(API + '/getassignedsubject/' + id);
const getAssignExam = () => axios.get(API + '/getassignedexam');
const getAssignTerm = () => axios.get(API + '/getassignedterm');
const getAssignYear = () => axios.get(API + '/getassignedyear');
const getFilter = (data) => axios.post(API + '/getstudentfilter', data);
const insertResult = (data) => axios.post(API + '/insertresults', data);
// --------- ENTRY AXIOS -----------





// --------- FILTER AXIOS -----------
const getX = (data) => axios.post(API + '/getx', data);
const deleteResult = (data) => axios.delete(API + '/deleteresult', data);
const getScore = (id) => axios.get(API + '/getscore/' + id);
const updateScore = (id, data) => axios.put(API + '/updatscore/' + id, data);
// --------- FILTER AXIOS -----------





// --------- TEACHER STUDENTS AXIOS -----------
const getCS = () => axios.get(API + '/getcs');
const getSingleStud = (id) => axios.get(API + '/getsinglestud/' + id);
const getFinancial = (id) => axios.get(API + '/getfin/' + id);
// --------- TEACHER STUDENTS AXIOS -----------



// --------- TEACHER DASHBOARD AXIOS -----------
const getTeacher4Dashboard = () => axios.get(API + '/getstd');
const getClassNSubject = () => axios.get(API + '/getcns');
const dashboardAssignClass = () => axios.get(API + '/getdct');
// --------- TEACHER DASHBOARD AXIOS -----------



// --------- CHART AXIOS -----------
const getStudentByGender = (id) => axios.get(API + '/getstudentgender/' + id);
const getTopStudent = () => axios.get(API + '/gettopstudent');
const getAveSubject = () => axios.get(API + '/getavesubject');
const countStudentByTeacher = () => axios.get(API + '/countstudentteacher');
// --------- CHART AXIOS -----------




// --------- ADMIN PROFILE AXIOS -----------
const getSchool = () => axios.get(API + '/admindet');
// --------- ADMIN PROFILE AXIOS -----------



// --------- REPORT AXIOS -----------
const getReport = (data) => axios.post(API + '/getreport', data);
const getStudentReport = (data) => axios.post(API + '/getstudentreport', data);
const getCTReport = (data) => axios.post(API + '/getctreport', data);
const countResult = (data) => axios.post(API + '/countreport', data);
const getSubjectPos = (data) => axios.post(API + '/subjectpos', data);
const realPos = (data) => axios.post(API + '/realpos', data);
const getTBySubject = (data) => axios.post(API + '/gettbs', data);
const getRemarks = (data) => axios.post(API + '/getremarkbyclass', data);
const deleteReport = (data) => axios.delete(API + '/deletereport', data);
// --------- REPORT AXIOS -----------




// eslint-disable-next-line
export default {
  // ------ REGISTER EXPORT -------
  createSchool,
  updateSchool,
  // ------ REGISTER EXPORT -------


  // ------ LOGIN EXPORT -------
  Verify,
  tVerify,
  Logon,
  Logout,
  tLogout,
  // ------ LOGIN EXPORT -------
  
  // ------ EXAM EXPORT -------
  addExam,
  getExam,
  deleteExam,
  editExam,
  updateExam,
  // ------ EXAM EXPORT -------


  // ------ YEAR EXPORT -------
  addYear,
  getYear,
  deleteYear,
  editYear,
  updateYear,
  // ------ YEAR EXPORT -------


  // ------ SUBJECT EXPORT -------
  addSubject,
  getSubject,
  deleteSubject,
  editSubject,
  updateSubject,
  // ------ SUBJECT EXPORT -------


  // ------ CLASS EXPORT -------
  addClass,
  getClass,
  deleteClass,
  editClass,
  updateClass,
  // ------ CLASS EXPORT -------


  // ------ TERM EXPORT -------
  addTerm,
  getTerm,
  deleteTerm,
  editTerm,
  updateTerm,
  // ------ TERM EXPORT -------


    // ------ GRADE EXPORT -------
    addGrade,
    getGrade,
    deleteGrade,
    editGrade,
    updateGrade,
    getJCEGrade,
    getMSCEGrade,
    // ------ GRADE EXPORT -------



    // ------ JCE EXPORT -------
    addJCE,
    getJCE,
    deleteJCE,
    editJCE,
    updateJCE,
    // ------ JCE EXPORT -------




    // ------ MSCE EXPORT -------
    addMSCE,
    getMSCE,
    deleteMSCE,
    editMSCE,
    updateMSCE,
    // ------ MSCE EXPORT -------





      // ------ TEACHER EXPORT -------
      addTeacher,
      getTeacher,
      getSingleTeacher,
      getTeacherClasses,
      getTeacherSubjects,
      deleteTeacher,
      editTeacher,
      updateTeacher,
      // ------ TEACHER EXPORT -------




      // ------ ASSIGN TEACHER EXPORT -------
      addAssignTeacher,
      getAssignTeacher,
      deleteAssignTeacher,
      // ------ ASSIGN TEACHER EXPORT -------



      // ------ CLASS TEACHER EXPORT -------
      addClassTeacher,
      getClassTeacher,
      deleteClassTeacher,
      // ------ CLASS TEACHER EXPORT -------




      // ------ STUDENT EXPORT -------
      addStudent,
      getStudent,
      getSingleStudent,
      deleteStudent,
      updateStudent,
      // ------ STUDENT EXPORT -------




       // ------ FEE EXPORT -------
       addFee,
       getFee,
       deleteFee,
       editFee,
       updateFee,
       // ------ FEE EXPORT -------




       // ------ PAYMENT EXPORT -------
       getPay,
       getPayee,
       addPay,
       editPay,
       updatePay,
       deletePay,
       // ------ PAYMENT EXPORT -------




       // ------ ENTRY EXPORT -------
       getAssignClass,
       getAssignSubject,
       getAssignExam,
       getAssignTerm,
       getAssignYear,
       getFilter,
       insertResult,
       // ------ ENTRY EXPORT -------




       // ------ FILTER EXPORT -------
       getX,
       getScore,
       updateScore,
       deleteResult,
       // ------ FILTER EXPORT -------



       // ------ TEACHER STUDENT EXPORT -------
       getCS,
       getSingleStud,
       getFinancial,
       // ------ TEACHER STUDENT EXPORT -------



       // ------ TEACHER DASHBOARD EXPORT -------
       getTeacher4Dashboard,
       getClassNSubject,
       dashboardAssignClass,
       // ------ TEACHER DASHBOARD EXPORT -------



       // ------ CHART EXPORT -------
       getStudentByGender,
       getTopStudent,
       getAveSubject,
       countStudentByTeacher,
       // ------ CHART EXPORT -------



       // ------ ADMIN PROFILE EXPORT -------
       getSchool,
       // ------ ADMIN PROFILE EXPORT -------



       // ------ REPORT EXPORT -------
       getReport,
       getStudentReport,
       getCTReport,
       countResult,
       getSubjectPos,
       realPos,
       getTBySubject,
       getRemarks,
       deleteReport,
       // ------ REPORT EXPORT -------
};
