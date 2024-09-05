import axios from 'axios';

const API_AUTH = 'http://localhost:5000/api/auth';
const API_SETTING = 'http://localhost:6000/api/setting';

// const getSchools = () => axios.get(API_URL);
// const getSchool = (id) => axios.get(`${API_URL}${id}`);
const createSchool = (data) => axios.post(API_AUTH + '/signup', data);
const Logon = (data) => axios.post(API_AUTH + '/login', data);
const newType = (data) => axios.post(API_SETTING + '/addtype', data);
// const updateSchool = (id, data) => axios.put(`${API_URL}${id}`, data);
// const deleteSchool = (id) => axios.delete(`${API_URL}${id}`);

export default {
  createSchool,
  Logon,
  newType,
};
