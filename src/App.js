// src/App.js
import React, { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [refresh, setRefresh] = useState(false);
  const darkMode = useSelector((state) => state.ui.darkMode);

  const handleTaskAdded = () => {
    setRefresh(!refresh);
  };

  const handleTaskDeleted = () => {
    setRefresh(!refresh);
  };

  // Create a theme based on the darkMode state
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Apply the theme to the entire app */}
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {/* TaskForm component with add and delete functionality */}
        <TaskForm
          onTaskAdded={handleTaskAdded}
          onTaskDeleted={handleTaskDeleted}
        />
        
        {/* TaskList component to display tasks */}
        <TaskList />
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
}

export default App;
