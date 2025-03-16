// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice'; // Import your slice

export const store = configureStore({
  reducer: {
    ui: uiReducer, // Add your slice to the store
  },
});