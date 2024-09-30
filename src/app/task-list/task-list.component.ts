import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule, FormsModule],
})
export class TaskListComponent {
  tasks: Task[] = [];
  filter: string = 'all';

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
  }

  get filteredTasks(): Task[] {
    if (this.filter === 'completed') {
      return this.tasks.filter(task => task.completed);
    } else if (this.filter === 'pending') {
      return this.tasks.filter(task => !task.completed);
    }
    return this.tasks; // Devuelve todas las tareas si no hay filtro
  }

  toggleComplete(task: Task) {
    task.completed = !task.completed; 
    this.saveTasksToLocalStorage(); 
  }

  saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
