import axios from 'axios';

axios.defaults.withCredentials = true;
const API = 'http://localhost:5000/api';

// const getSchools = () => axios.get(API_RL);
// const getSchool = (id) => axios.get(`${API_URL}${id}`);
// const updateSchool = (id, data) => axios.put(`${API_URL}${id}`, data);
// const deleteSchool = (id) => axios.delete(`${API_URL}${id}`);

// --------- REGISTER AXIOS -----------

const createSchool = (data) => axios.post(API + '/signup', data);

// --------- REGISTER AXIOS -----------





// --------- LOGIN AXIOS -----------

const Logon = (data) => axios.post(API + '/login', data);
const Verify = () => axios.post(API + '/verify');
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




// eslint-disable-next-line
export default {
  // ------ REGISTER EXPORT -------
  createSchool,
  // ------ REGISTER EXPORT -------


  // ------ LOGIN EXPORT -------
  Verify,
  Logon,
  Logout,
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
};
