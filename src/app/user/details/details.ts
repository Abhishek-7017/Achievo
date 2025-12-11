import { Component, OnInit, signal } from '@angular/core';
import { AchievoInput } from '../../shared/achievo-input/achievo-input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-details',
  imports: [AchievoInput, ReactiveFormsModule, CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit {

  employee!: Employee;

  form!: FormGroup<{
    fullName: FormControl<string>;
    email: FormControl<string>;
    phone: FormControl<string>;
    role: FormControl<string[]>;
    department: FormControl<string>;
  }>;

  editMode = signal(false);
  loading = signal(true);
  saving = signal(false);

  userName: string = 'System';

  constructor(
    private svc: EmployeeService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loadUser();
    if(this.employee){
      this.employee.profilePicUrl = 'profile.png';
    }
  }

  loadUser() {
    this.loading.set(true);

    this.svc.getEmployee(this.userName)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (user) => {
          this.employee = user;
          this.buildForm(user); 
        },
        error: err => console.error('User load error', err)
      });
  }

  buildForm(emp: Employee) {

    this.form = this.fb.group({
      fullName: this.fb.control(emp.fullName, {
        validators: [Validators.required, Validators.minLength(2)],
        nonNullable: true
      }),
      email: this.fb.control(emp.email, {
        validators: [Validators.required, Validators.email],
        nonNullable: true
      }),
      phone: this.fb.control(emp.phone, {
        validators: [Validators.required],
        nonNullable: true
      }),

      role: this.fb.control([...emp.role], {
        validators: [Validators.required],
        nonNullable: true
      }),

      department: this.fb.control(emp.department, {
        validators: [Validators.required],
        nonNullable: true
      })
    });
  }

  enterEditMode() {
    this.editMode.set(true);
  }

  cancelEdit() {
    this.buildForm(this.employee); // Reset form
    this.editMode.set(false);
  }

  saveChanges() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValues = this.form.getRawValue(); 
    const updated: Employee = {
      ...this.employee,
      ...formValues,
      role: [...formValues.role],
      joiningDate: new Date(this.employee.joiningDate),
      totalPoints: this.employee.totalPoints,
      isActive: this.employee.isActive
    };

    this.saving.set(true);

    this.svc.updateEmployee(updated)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: (res) => {
          this.employee = res;
          this.cancelEdit();
        },
        error: (err) => {
          console.error('Update error', err);
        }
      });
  }

  save() {
    this.saveChanges();
  }

}
