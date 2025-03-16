// src/components/TaskForm.jsx
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskForm = ({ onTaskAdded, onTaskDeleted }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [taskIdToDelete, setTaskIdToDelete] = useState('');
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  // Function to handle adding a new task
  const handleAddTask = async () => {
    if (!title) {
      alert('Title cannot be empty!');
      return;
    }

    const newTask = { title, description, status };

    try {
      await axios.post('http://localhost:5071/api/tasks', newTask);
      onTaskAdded();
      setTitle('');
      setDescription('');
      setStatus('To Do');
      toast.success('Task added successfully.');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task. Please check the console for details.');
    }
  };

  // Function to verify the password
  const verifyPassword = () => {
    const enteredPassword = prompt('Please enter the password to enable delete permissions:');
    if (enteredPassword === '12345') { // Replace '12345' with your actual password
      setIsPasswordVerified(true);
      toast.success('Password verified. You can now delete tasks.');
    } else {
      toast.error('Incorrect password. Delete permissions not granted.');
    }
  };

  // Function to handle deleting a task
  const handleDeleteTask = async () => {
    if (!taskIdToDelete) {
      alert('Please enter a task ID to delete!');
      return;
    }

    if (!isPasswordVerified) {
      verifyPassword(); // Prompt for password if not verified
      return;
    }

    try {
      await axios.delete(`http://localhost:5071/api/tasks/${taskIdToDelete}`);
      onTaskDeleted();
      setTaskIdToDelete('');
      toast.success('Task deleted successfully.');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task. Please check the console for details.');
    }
  };

  return (
    <Box sx={{ mb: 4 }}>

      {/* Form to add a new task */}
      <Box component="form" sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>Add a New Task</Typography>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </TextField>
        <Button variant="contained" color="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </Box>

      {/* Form to delete a task */}
      <Box component="form" sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>Delete a Task</Typography>
        <TextField
          label="Task ID to Delete"
          value={taskIdToDelete}
          onChange={(e) => setTaskIdToDelete(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="secondary" onClick={handleDeleteTask}>
          Delete Task
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;