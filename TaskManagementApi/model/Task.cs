// Models/Task.cs
namespace TaskManagementApi.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty; // Initialize with empty string
        public string Description { get; set; } = string.Empty; // Initialize with empty string
        public string Status { get; set; } = "To Do"; // Initialize with default status
    }
}