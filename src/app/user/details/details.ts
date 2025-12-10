import { Component, OnInit, signal } from '@angular/core';
import { AchievoInput } from '../../shared/achievo-input/achievo-input';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
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
  form!: FormGroup;
  fullNameCtrl!:FormControl;
  emailCtrl!:FormControl;
  phoneCtrl!:FormControl;
  roleCtrl!:FormControl;
  departmentCtrl!:FormControl;


  editMode = signal(false);
  loading = signal(true);
  saving = signal(false);

  userName:string = 'System';

  constructor(
    private svc: EmployeeService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loadUser();

    this.fullNameCtrl = this.form.get('fullName') as FormControl;
    this.emailCtrl = this.form.get('email') as FormControl;
    this.phoneCtrl = this.form.get('phone') as FormControl;
    this.roleCtrl = this.form.get('role') as FormControl;
    this.departmentCtrl = this.form.get('department') as FormControl;
  }


  loadUser() {
    this.loading.set(true);
    this.svc.getEmployee(this.userName)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: user => this.employee.set(user),
        error: err => console.error('User load error', err)
      });
  }

  save() {
    const updatedUser = this.form.getRawValue(); // assuming form exists

    this.saving.set(true);

    this.svc.updateEmployee(updatedUser)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: user => console.log('Updated', user),
        error: err => console.error('Update error', err)
      });
  }

  buildForm(emp: Employee) {
    this.form = this.fb.group({
      fullName: [emp.fullName, [Validators.required, Validators.minLength(2)]],
      email: [emp.email, [Validators.required, Validators.email]],
      phone: [emp.phone, Validators.required],
      role: [emp.role, Validators.required],
      department: [emp.department, Validators.required]
    });
  }

  enterEditMode() {
    this.editMode.set(true);
  }

  cancelEdit() {
    this.buildForm(this.employee);
    this.editMode.set(false);
  }

  saveChanges() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const updated: Employee = {
      ...this.employee,
      ...this.form.value
    };

    this.saving.set(true);

    this.svc.updateEmployee(updated).subscribe(res => {
      this.employee = res;
      this.cancelEdit();
      this.saving.set(false);
    });
  }
}
