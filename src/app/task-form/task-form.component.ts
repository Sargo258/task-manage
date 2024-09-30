import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
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
      people: this.fb.array([]), // Cambia aquí
    });
  }

  get people(): FormArray {
    return this.taskForm.get('people') as FormArray; // Acceso al FormArray
  }

  addPerson() {
    const personForm = this.fb.group({
      namePerson: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      habilities: ['', Validators.required],
    });
    this.people.push(personForm); // Agrega un nuevo FormGroup para la persona
  }

  removePerson(index: number) {
    this.people.removeAt(index); // Elimina la persona del FormArray
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
