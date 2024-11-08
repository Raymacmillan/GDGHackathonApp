import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoComponentList implements OnInit {
  todoList: string = ''; // This will bind to the input
  tasks: { text: string, id: number; completed: boolean }[] = []; // Store tasks as an array of objects

  ngOnInit() {
    // Load tasks from local storage when the component initializes
    const storedTasks = localStorage.getItem('tasks');
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
  }

  onAddTask() {
    if (this.todoList.trim()) { // Ensure input is not empty
      const newTask = { text: this.todoList.trim(), id: Date.now(), completed: false }; // Add a unique ID
      this.tasks.push(newTask); // Add the new task to the tasks array
      this.todoList = ''; // Clear the input

      // Save tasks to local storage
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      console.log(this.tasks);
    }
  }

  onRemoveTask(taskId: number) {
    // Remove task by filtering out the task with the matching ID
    this.tasks = this.tasks.filter(task => task.id !== taskId);

    // Update local storage
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  onToggleTaskCompletion(taskId: number) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
}

