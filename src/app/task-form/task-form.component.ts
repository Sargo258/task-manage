import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
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
      people: this.fb.array([], uniqueNamesValidator()),
    });
  }

  get people(): FormArray {
    return this.taskForm.get('people') as FormArray;
  }

  addPerson() {
    const personForm = this.fb.group({
      namePerson: ['', [Validators.required, Validators.minLength(5)]], 
      age: ['', [Validators.required, Validators.min(18)]],
      habilities: this.fb.array([]),
    });
    this.people.push(personForm);
  }
  
  
  addHability(personIndex: number) {
    const habilities = this.getHabilities(personIndex);
    habilities.push(this.fb.control('', Validators.required));
  }

  removePerson(index: number) {
    this.people.removeAt(index);
  }

  getHabilities(personIndex: number): FormArray {
    return this.people.at(personIndex).get('habilities') as FormArray;
  }

  removeHability(personIndex: number, habilityIndex: number) {
    this.getHabilities(personIndex).removeAt(habilityIndex);
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      this.taskService.addTask(task);
      this.taskForm.reset();
    } else {

      if (this.people.errors?.['duplicateNames']) {
        alert('No se pueden asignar personas con el mismo nombre más de una vez.');
      }

      this.taskForm.markAllAsTouched();
    }
  }
}

export function uniqueNamesValidator(): ValidatorFn {
  return (formArray: AbstractControl): ValidationErrors | null => {
    const names = formArray.value.map((person: { namePerson: string }) => person.namePerson.trim().toLowerCase());
    const hasDuplicates = names.some((name: any, index: any) => names.indexOf(name) !== index);

    return hasDuplicates ? { duplicateNames: true } : null;
  };
}

