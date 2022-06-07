import { createSlice } from '@reduxjs/toolkit';

interface ThemeModeState {
  value: string;
}

const initialState: ThemeModeState = {
  value: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
};

const themeModeSlice = createSlice({
  name: 'themeMode',
  initialState,
  reducers: {
    toggleThemeMode: (state: ThemeModeState) => {
      // eslint-disable-next-line no-param-reassign
      if (state.value === 'dark') state.value = 'light';
      // eslint-disable-next-line no-param-reassign
      else state.value = 'dark';
    },
  },
});

export const { toggleThemeMode } = themeModeSlice.actions;

export default themeModeSlice.reducer;
