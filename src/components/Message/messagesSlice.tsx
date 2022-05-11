import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    value: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
