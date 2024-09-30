import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task, Person } from '../models/task.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      nameTask: ['', Validators.required],
      limitDate: ['', Validators.required],
      completed: [false],
      person: this.fb.group({
        namePerson: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(18)]],
        habilities: ['', Validators.required],
      }),
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      this.taskService.addTask(task);
      this.taskForm.reset();
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}
