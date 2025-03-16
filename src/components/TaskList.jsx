// src/components/TaskList.jsx
import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Box,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isPasswordVerifiedForDelete, setIsPasswordVerifiedForDelete] = useState(false);
  const [isPasswordVerifiedForEdit, setIsPasswordVerifiedForEdit] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5071/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const verifyPassword = (action) => {
    const enteredPassword = prompt(`Please enter the password to enable ${action} permissions:`);
    if (enteredPassword === '12345') { // Replace '12345' with your actual password
      if (action === 'delete') {
        setIsPasswordVerifiedForDelete(true);
      } else if (action === 'edit') {
        setIsPasswordVerifiedForEdit(true);
      }
      toast.success(`Password verified. You can now ${action} tasks.`);
    } else {
      toast.error('Incorrect password. Permissions not granted.');
    }
  };

  const handleDelete = async (id) => {
    if (!isPasswordVerifiedForDelete) {
      verifyPassword('delete'); // Prompt for password if not verified
      return;
    }

    try {
      await axios.delete(`http://localhost:5071/api/tasks/${id}`);
      fetchTasks(); // Refresh the task list
      toast.success('Task deleted successfully.');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task. Please check the console for details.');
    }
  };

  const handleEdit = (task) => {
    if (!isPasswordVerifiedForEdit) {
      verifyPassword('edit'); // Prompt for password if not verified
      return;
    }

    setEditingTask(task); // Set the task to be edited
    setIsEditModalOpen(true); // Open the edit modal
  };

  const handleSaveEdit = async () => {
    if (!editingTask) {
      toast.error('No task selected for editing.');
      return;
    }

    try {
      await axios.put(`http://localhost:5071/api/tasks/${editingTask.id}`, editingTask);
      fetchTasks(); // Refresh the task list
      setIsEditModalOpen(false); // Close the modal
      toast.success('Task updated successfully.');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task. Please check the console for details.');
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false); // Close the modal without saving
  };

  const filteredTasks = tasks.filter(task => filter === 'All' || task.status === filter);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Task List</Typography>
      <TextField
        select
        label="Filter by Status"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="To Do">To Do</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Done">Done</MenuItem>
      </TextField>
      <List>
        {filteredTasks.map(task => (
          <ListItem key={task.id}>
            <ListItemText primary={task.title} secondary={task.description} />
            <Typography variant="body2" sx={{ mr: 2 }}>Status: {task.status}</Typography>
            <Button onClick={() => handleEdit(task)}>Edit</Button>
            <Button onClick={() => handleDelete(task.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>

      {/* Edit Task Modal */}
      <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            defaultValue={editingTask?.title || ''}
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
          />
          <TextField
            label="Description"
            defaultValue={editingTask?.description || ''}
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
          />
          <TextField
            select
            label="Status"
            defaultValue={editingTask?.status || 'To Do'}
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
          >
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskList;