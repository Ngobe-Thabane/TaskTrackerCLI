import { Command } from 'commander';
import { TaskStatuses, TaskTracker } from './TaskTracker.js';

const program = new Command();
const taskTracker = new TaskTracker();

program.name('task-cli')
  .description("Task tracker is a project used to track and manage your tasks.")
  .version('0.0.1');

program.command('update <id> <string>')
  .description('Update a task')
  .action((str, text)=>{
    taskTracker.updateTasks(str, text);
  }) 

program.command('delete <id>').description('Delete a task')
  .action((id)=>{
    taskTracker.deleteTask(id);
  });

program.command('add <text>').description('Add a new task')
  .action((str)=>{
    taskTracker.addTask(str);
  })

program.command('mark-done <id>').description('Mark a task as done')
  .action((id)=>{
    taskTracker.updateStatus(id,TaskStatuses.DONE);
})

program.command('mark-in-progress <id>').description('Mark a task as in progress')
  .action((id)=>{
    taskTracker.updateStatus(id, TaskStatuses.IN_PROGRESS);
})

program.command('list [type]').description('List avialable task')
  .action((str)=>{
    taskTracker.listTasks(str)
  })

program.parse();