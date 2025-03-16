// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Switch } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../features/ui/uiSlice'; // Import the action

const Navbar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.ui.darkMode);

  const handleThemeChange = () => {
    dispatch(setDarkMode());
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Management App
        </Typography>
        <Typography variant="body1" sx={{ mr: 2 }}>
          {darkMode ? 'Dark Mode' : 'Light Mode'}
        </Typography>
        <Switch
          checked={darkMode}
          onChange={handleThemeChange}
          color="default"
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;