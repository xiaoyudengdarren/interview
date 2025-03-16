// Data/TaskContext.cs
using System.Collections.Generic;
using TaskManagementApi.Models;

namespace TaskManagementApi.Data
{
    public class TaskContext
    {
        public List<TaskItem> Tasks { get; set; }

        public TaskContext()
        {
            // Seed initial tasks
            Tasks = new List<TaskItem>
            {
                new TaskItem { Id = 1, Title = "Task 1", Description = "Description for Task 1", Status = "To Do" },
                new TaskItem { Id = 2, Title = "Task 2", Description = "Description for Task 2", Status = "In Progress" },
                new TaskItem { Id = 3, Title = "Task 3", Description = "Description for Task 3", Status = "Done" }
            };
        }
    }
}