// src/features/ui/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper function to get the initial darkMode value from localStorage
const getInitialDarkMode = () => {
  const storedDarkMode = localStorage.getItem('darkMode');
  return storedDarkMode ? JSON.parse(storedDarkMode) : true; // Default to dark mode if no value is stored
};

// Create the slice
export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isLoading: false,
    darkMode: getInitialDarkMode(), // Initialize darkMode from localStorage
  },
  reducers: {
    // Action to start loading
    startLoading: (state) => {
      state.isLoading = true;
    },
    // Action to stop loading
    stopLoading: (state) => {
      state.isLoading = false;
    },
    // Action to toggle dark mode
    setDarkMode: (state) => {
      // Toggle darkMode and save it to localStorage
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
    },
  },
});

// Export the actions
export const { startLoading, stopLoading, setDarkMode } = uiSlice.actions;

// Export the reducer
export default uiSlice.reducer;