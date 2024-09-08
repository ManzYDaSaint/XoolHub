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
  },
});

export const { setIsEditMode, setEditItemId, setFormData } = ExamSlice.actions;
export default ExamSlice.reducer;