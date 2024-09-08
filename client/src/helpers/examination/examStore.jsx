import { configureStore } from '@reduxjs/toolkit';
import ExamReducer from './examSlice.jsx'

const ExamStore = configureStore({
  reducer: {
    exam: ExamReducer,
  },
});

export default ExamStore;