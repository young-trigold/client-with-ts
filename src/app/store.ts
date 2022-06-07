import { configureStore } from '@reduxjs/toolkit';

import themeModeReducer from '../theme/themeModeSlice';
import catalogVisibleReducer from '../components/pages/ReadingPage/CataLogVisibleSlice';
import messagesReducer from '../components/Message/messagesSlice';

const store = configureStore({
  reducer: {
    themeMode: themeModeReducer,
    catalogVisible: catalogVisibleReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
