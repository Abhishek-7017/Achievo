import { Component, Input, } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule, } from '@angular/forms';

@Component({
  selector: 'app-achievo-input',
  imports: [ReactiveFormsModule],
  templateUrl: './achievo-input.html',
  styleUrl: './achievo-input.css'
})
export class AchievoInput {
  @Input() label: string='';
  @Input() placeholder = '';
  @Input() control!: AbstractControl;
  @Input() editMode = false;
  @Input() type: string = "text";
}
