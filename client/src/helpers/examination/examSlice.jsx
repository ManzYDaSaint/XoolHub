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
  },
});

export const { setIsEditMode, setEditItemId, setFormData, setSubjectFormData, setRegisterData, setLoginData, setYearFormData } = ExamSlice.actions;
export default ExamSlice.reducer;