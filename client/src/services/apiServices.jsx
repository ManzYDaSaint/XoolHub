import axios from 'axios';

const API = 'http://localhost:5000/api';

// const getSchools = () => axios.get(API_URL);
// const getSchool = (id) => axios.get(`${API_URL}${id}`);
const createSchool = (data) => axios.post(API + '/signup', data);
const Logon = (data) => axios.post(API + '/login', data);
// const updateSchool = (id, data) => axios.put(`${API_URL}${id}`, data);
// const deleteSchool = (id) => axios.delete(`${API_URL}${id}`);


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

export default {
  createSchool,
  Logon,

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
};
