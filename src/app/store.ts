import { configureStore } from '@reduxjs/toolkit';

import themeModeReducer from '../theme/themeModeSlice';
import catalogVisibleReducer from '../components/pages/ReadingPage/CataLogVisibleSlice';
import messagesReducer from '../components/Message/messagesSlice';

export default configureStore({
  reducer: {
    themeMode: themeModeReducer,
    catalogVisible: catalogVisibleReducer,
    messages: messagesReducer,
  },
});
