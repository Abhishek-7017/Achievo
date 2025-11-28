import { Component } from '@angular/core';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details {
  user={
    profilePic:'Sample_profile.png',
    firstName:'Abhishek',
    joined:'1969',
    lastName:'Varshney',
    address:'Sector 14 gurugram',
    city:'Gurgaon',
    state:'Haryana',
    zip:'204101',
    country:'India',
    phone:'123456789',
    language:'English',
    timezone:'Gmt 5:30',
    verificationId:'id123456',
    email:'abc@123.com'
  }
}
