import { createSlice } from '@reduxjs/toolkit';

const CatalogVisibleSlice = createSlice({
  name: 'catalogVisible',
  initialState: {
    value: false,
  },
  reducers: {
    toggleCatalogVisible: (state) => {
      // eslint-disable-next-line no-param-reassign
      if (state.value === true) state.value = false;
      // eslint-disable-next-line no-param-reassign
      else state.value = true;
    },
  },
});

export const { toggleCatalogVisible } = CatalogVisibleSlice.actions;

export default CatalogVisibleSlice.reducer;
