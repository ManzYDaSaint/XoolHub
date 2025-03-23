import { createSlice } from '@reduxjs/toolkit';

const ExamSlice = createSlice({
  name: 'exam',
  initialState: {
    isEditMode: false,
    editItemId: null,
    studentIDs: [],
    formData: {
      namer: '',
      percentage: '',
    },
    adminFormData: {
      name: '',
      address: '',
      city: '',
      country: '',
      email: '',
      contact: '',
      logo: '',
      slogan: '',
      type: '',
    },
    passwordFormData: {
      current: '',
      newPassword: '',
      confirm: '',
    },
    eventFormData: {
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
    },
    superPassword: {
      current: '',
      newPassword: '',
      confirm: '',
    },
    superDetail: {
      email: '',
      phone: '',
      address: '',
      email_address: '',
      whatsapp: '',
    },
    yearFormData: {
      yearName: '',
      startDate: '',
      endDate: '',
    },
    subjectFormData: {
      subjectName: '',
      code: '',
    },
    registerData: {
      schoolEmail: '',
      schoolPassword: '',
      confirm: '',
    },
    loginData: {
      schoolEmail: "",
      schoolPassword: "",
    },
    classFormData: {
      denom: '',
      className: '',
    },
    contactData: {
      name: '',
      email: '',
      message: '',
    },
    termFormData: {
      termName: '',
      year: '',
      startDate: '',
      endDate: '',
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
      gender: '',
      role: '',
    },
    studentFormData: {
      studentNames: '',
      yearid: '',
      classid: '',
    },
    entryFormData: {
      studentIDs: '',
      yearid: '',
      termid: '',
      typeid: '',
      classid: '',
    },
    reportFormData: {
      termid: '',
      typeid: '',
      classid: '',
    },
    filterFormData: {
      typeid: '',
      selectedClass: '',
    },
    xFormData: {
      yearid: '',
      termid: '',
      typeid: '',
      selectedClass: '',
    },
    studentUpdateFormData: {
      student: '',
      class: '',
      email: '',
      contact: '',
      gender: '',
      address: '',
      dob: '',
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
    feesFormData: {
      name: '',
      amount: '',
      description: '',
    },
    payFormData: {
      studentID: '',
      paid: '',
      term: ''
    },
    scoreFormData: {
      score: '',
    },
    subscribeData: {
      email: '',
    },
    subscriptionData: {
      name: '',
      price: '',
      features: '',
    },
  },
  reducers: {
    setIsEditMode: (state, action) => {
      state.isEditMode = action.payload;
    },
    setEditItemId: (state, action) => {
      state.editItemId = action.payload;
    },
    setStudentIDs: (state, action) => {
      state.studentIDs = action.payload;
    },
    setEventFormData: (state, action) => {
      state.eventFormData = action.payload;
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
    setSubscribeData: (state, action) => {
      state.subscribeData = action.payload;
    },
    setYearFormData: (state, action) => {
      state.yearFormData = action.payload;
    },
    setClassFormData: (state, action) => {
      state.classFormData = action.payload;
    },
    setContactData: (state, action) => {
      state.contactData = action.payload;
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
    setStudentUpdateFormData: (state, action) => {
      state.studentUpdateFormData = action.payload;
    },
    setAssignTeacherFormData: (state, action) => {
      state.assignTeacherFormData = action.payload;
    },
    setClassTeacherFormData: (state, action) => {
      state.classTeacherFormData = action.payload;
    },
    setFeesFormData: (state, action) => {
      state.feesFormData = action.payload;
    },
    setPayFormData: (state, action) => {
      state.payFormData = action.payload;
    },
    setEntryFormData: (state, action) => {
      state.entryFormData = action.payload;
    },
    setFilterFormData: (state, action) => {
      state.filterFormData = action.payload;
    },
    setXFormData: (state, action) => {
      state.xFormData = action.payload;
    },
    setScoreFormData: (state, action) => {
      state.scoreFormData = action.payload;
    },
    setAdminFormData: (state, action) => {
      state.adminFormData = action.payload;
    },
    setPasswordFormData: (state, action) => {
      state.passwordFormData = action.payload;
    },
    setSuperPassword: (state, action) => {
      state.superPassword = action.payload;
    },
    setSuperDetail: (state, action) => {
      state.superDetail = action.payload;
    },
    setReportFormData: (state, action) => {
      state.reportFormData = action.payload;
    },
    setSubscriptionData: (state, action) => {
      state.subscriptionData = action.payload;
    },
  },
});

export const { 
  setIsEditMode, 
  setEditItemId, 
  setStudentIDs,
  setFormData, 
  setSubjectFormData, 
  setRegisterData, 
  setLoginData, 
  setYearFormData, 
  setClassFormData,
  setTermFormData,
  setGradeFormData,
  setJCEFormData,
  setContactData,
  setMSCEFormData,
  setTeacherFormData,
  setAssignTeacherFormData,
  setClassTeacherFormData,
  setStudentFormData,
  setStudentUpdateFormData,
  setFeesFormData,
  setPayFormData,
  setEntryFormData,
  setFilterFormData,
  setXFormData,
  setScoreFormData,
  setAdminFormData,
  setPasswordFormData,
  setReportFormData,
  setSuperPassword,
  setSuperDetail,
  setSubscriptionData,
  setEventFormData,
  setSubscribeData,
} = ExamSlice.actions;
export default ExamSlice.reducer;