import { Component, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(private auth: AuthService,private modal:ModalService){}
  invalidPassword:boolean = false;

  @Output() closeModal = new EventEmitter<void>();

  login(val:NgForm) {
    const credentials = {
      userName: val.controls["userName"].value,
      password: val.controls["password"].value
    };
    console.log(credentials);
    this.auth.login(credentials).subscribe({
      next: (res) => {
        this.closeModal.emit();
      },
      error: (err) => {
        this.invalidPassword = true;
      }
    });
  }
}
