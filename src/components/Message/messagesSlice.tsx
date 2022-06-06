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
    clearMessage: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.value = [];
    },
  },
});

export const { addMessage, clearMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
