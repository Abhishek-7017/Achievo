import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ FormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(private auth: AuthService){}

  login(val:NgForm) {
    const credentials = {
      userName: val.controls["email"].value,
      password: val.controls["password"].value
    };
    console.log(credentials);
    this.auth.login(credentials).subscribe({
      next: (res) => {
        console.log("Login successful!", res);
      },
      error: (err) => {
        console.error("Login failed", err);
      }
    });
  }
}
