// Controllers/TasksController.cs
using Microsoft.AspNetCore.Mvc;
using TaskManagementApi.Data;
using TaskManagementApi.Models;

namespace TaskManagementApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly TaskContext _context;

        public TasksController(TaskContext context)
        {
            _context = context;
        }

        // GET: api/tasks
        [HttpGet]
        public ActionResult<IEnumerable<TaskItem>> GetTasks()
        {
            return _context.Tasks;
        }

        [HttpPost]
        public ActionResult<TaskItem> CreateTask(TaskItem task)
        {
            // Find the maximum ID in the current task list
            int maxId = _context.Tasks.Any() ? _context.Tasks.Max(t => t.Id) : 0;

            // Assign the new task an ID that is one greater than the maximum ID
            task.Id = maxId + 1;

            _context.Tasks.Add(task);
            return CreatedAtAction(nameof(GetTasks), task);
        }

        // PUT: api/tasks/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateTask(int id, TaskItem task)
        {
            var existingTask = _context.Tasks.FirstOrDefault(t => t.Id == id);
            if (existingTask == null) return NotFound();

            existingTask.Title = task.Title;
            existingTask.Description = task.Description;
            existingTask.Status = task.Status;

            return NoContent();
        }

        // DELETE: api/tasks/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteTask(int id)
        {
            var task = _context.Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();

            _context.Tasks.Remove(task);
            return NoContent();
        }
    }
}