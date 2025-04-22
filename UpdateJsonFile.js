import fs from 'fs';

export  class UpdateJsonFile{
  #tasks;

  constructor(){
    const data = fs.readFileSync('./Tasks.json', 'utf-8');
    this.#tasks = JSON.parse(data);
  }

  getTasks(){
    return this.#tasks.tasks;
  }

  updateTasks(task){
    this.#tasks.tasks.push(task);
  }

  updateTask(id, description){
    const task = this.getTask(id);
    const oldDescription = task.description;
    task.description = description;
    this.writeToJSONFile();
    console.log(`Task: ${oldDescription} updated to ${task.description} (ID: ${task.id})`);
  }

  updateStatus(id, status){
    const task = this.getTask(id);
    task.status = status;
    this.writeToJSONFile();
    console.log(`Status updated successfully`)
  }

  deleteTask(id){
    this.#tasks.tasks = this.#tasks.tasks.filter((task)=> task.id !== Number.parseInt(id));
    this.writeToJSONFile();
    console.log(`Task ${id} deleted successfuly`)
  }

  getTask(id){
    return this.#tasks.tasks.find((task)=> {
      return task.id === Number.parseInt(id)
    });
  }

  writeToJSONFile(){
    fs.writeFileSync('./Tasks.json', JSON.stringify(this.#tasks))
  }
}