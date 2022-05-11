import { createSlice } from '@reduxjs/toolkit';

const themeModeSlice = createSlice({
  name: 'themeMode',
  initialState: {
    value: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  },
  reducers: {
    toggleThemeMode: (state) => {
      // eslint-disable-next-line no-param-reassign
      if (state.value === 'dark') state.value = 'light';
      // eslint-disable-next-line no-param-reassign
      else state.value = 'dark';
    },
  },
});

export const { toggleThemeMode } = themeModeSlice.actions;

export default themeModeSlice.reducer;
