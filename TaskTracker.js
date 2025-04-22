import { UpdateJsonFile } from "./UpdateJsonFile.js";

export const TaskStatuses = {TODO: "todo", IN_PROGRESS:'in-progress', DONE: "done"}

export class TaskTracker{

  #tasks;
  constructor(){
    this.#tasks = new UpdateJsonFile();
  }

  getId(){
    return this.#tasks.getTasks().length+1;
  }

  addTask(task){
    const taskId = this.getId();
    const taskDatials = {
      id : taskId,
      status : TaskStatuses.TODO,
      description : task,
      createdAt : new Date().getTime(),
      updatedAt : new Date().getTime()
    }
    this.#tasks.updateTasks(taskDatials);
    this.#tasks.writeToJSONFile();
    console.log(`Task added successfully (ID:${taskId})`);
  }

  getTask(id){
    return this.#tasks.getTasks().find((task)=> task.id === id);
  }  

  deleteTask(id){
    this.#tasks.deleteTask(id)
  }
  
  updateStatus(id, status){
    this.#tasks.updateStatus(id, status);
  }

  updateTasks(id, text){
    this.#tasks.updateTask(id, text);
  }

  listTasks(status){
    this.#tasks.getTasks().forEach((task)=>{
      if(task.status === status || status === undefined){
        console.log(`${task.id}    ${task.description}   ${task.status}`);
      }
    })
  }
}