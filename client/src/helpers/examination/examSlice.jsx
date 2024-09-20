import { createSlice } from '@reduxjs/toolkit';

const ExamSlice = createSlice({
  name: 'exam',
  initialState: {
    isEditMode: false,
    editItemId: null,
    formData: {
      namer: '',
      percentage: '',
    },
    yearFormData: {
      yearName: '',
    },
    subjectFormData: {
      subjectName: '',
      code: '',
    },
    registerData: {
      schoolName: '',
      schoolEmail: '',
      schoolContact: '',
      schoolPassword: '',
      confirm: '',
    },
    loginData: {
      schoolEmail: '',
      schoolPassword: '',
    },
    classFormData: {
      denom: '',
      className: '',
    },
    termFormData: {
      termName: '',
    },
    gradeFormData: {
      denom: '',
      roof: '',
      floor: '',
      grade: '',
      remark: '',
    },
    jceFormData: {
      denom: 'JCE',
      roof: '',
      floor: '',
      remark: '',
    },
    msceFormData: {
      denom: 'MSCE',
      roof: '',
      floor: '',
      remark: '',
    },
    teacherFormData: {
      name: '',
      contact: '',
      email: '',
      address: '',
    },
    studentFormData: {
      studentNames: '',
      yearid: '',
      classid: '',
    },
    assignTeacherFormData: {
      teacherid: '',
      classid: '',
      subjectid: '',
    },
    classTeacherFormData: {
      teacherid: '',
      classid: '',
    },
  },
  reducers: {
    setIsEditMode: (state, action) => {
      state.isEditMode = action.payload;
    },
    setEditItemId: (state, action) => {
      state.editItemId = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setSubjectFormData: (state, action) => {
      state.subjectFormData = action.payload;
    },
    setRegisterData: (state, action) => {
      state.registerData = action.payload;
    },
    setLoginData: (state, action) => {
      state.loginData = action.payload;
    },
    setYearFormData: (state, action) => {
      state.yearFormData = action.payload;
    },
    setClassFormData: (state, action) => {
      state.classFormData = action.payload;
    },
    setTermFormData: (state, action) => {
      state.termFormData = action.payload;
    },
    setGradeFormData: (state, action) => {
      state.gradeFormData = action.payload;
    },
    setJCEFormData: (state, action) => {
      state.jceFormData = action.payload;
    },
    setMSCEFormData: (state, action) => {
      state.msceFormData = action.payload;
    },
    setTeacherFormData: (state, action) => {
      state.teacherFormData = action.payload;
    },
    setStudentFormData: (state, action) => {
      state.studentFormData = action.payload;
    },
    setAssignTeacherFormData: (state, action) => {
      state.assignTeacherFormData = action.payload;
    },
    setClassTeacherFormData: (state, action) => {
      state.classTeacherFormData = action.payload;
    },
  },
});

export const { 
  setIsEditMode, 
  setEditItemId, 
  setFormData, 
  setSubjectFormData, 
  setRegisterData, 
  setLoginData, 
  setYearFormData, 
  setClassFormData,
  setTermFormData,
  setGradeFormData,
  setJCEFormData,
  setMSCEFormData,
  setTeacherFormData,
  setAssignTeacherFormData,
  setClassTeacherFormData,
  setStudentFormData
} = ExamSlice.actions;
export default ExamSlice.reducer;