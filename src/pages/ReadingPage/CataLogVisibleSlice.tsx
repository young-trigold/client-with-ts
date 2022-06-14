import { createSlice } from '@reduxjs/toolkit';

export interface CatalogVisivleState {
  value: boolean;
}

const initialState: CatalogVisivleState = {
  value: false,
};

const CatalogVisibleSlice = createSlice({
  name: 'catalogVisible',
  initialState,
  reducers: {
    toggleCatalogVisible: (state: CatalogVisivleState) => {
      // eslint-disable-next-line no-param-reassign
      if (state.value === true) state.value = false;
      // eslint-disable-next-line no-param-reassign
      else state.value = true;
    },
  },
});

export const { toggleCatalogVisible } = CatalogVisibleSlice.actions;

export default CatalogVisibleSlice.reducer;
