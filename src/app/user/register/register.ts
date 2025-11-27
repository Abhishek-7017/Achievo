import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  constructor(private authService:AuthService,private router:Router){}
  
  password:string = '';
  confirmPassword:string='';
  passwordMismatch:boolean=false;

  @Output() onModalClose = new EventEmitter<void>();
  
  CheckPasswords() {
    this.passwordMismatch = this.password !== this.confirmPassword;
  }

  register(registerForm:NgForm){
    var credentials = {
      userName:registerForm.controls["userName"].value,
      password:registerForm.controls["password"].value
    }

    this.authService.register(credentials).subscribe({
      next: (res) => {
        this.onModalClose.emit();
        this.router.navigate(["details"])
        console.log("Register successful!", res);
      },
      error: (err) => {
        console.error("Register failed", err);
      }
    });

  }
}
