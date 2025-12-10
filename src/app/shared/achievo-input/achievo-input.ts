import { Component, Input, } from '@angular/core';
import { FormControl, ReactiveFormsModule, } from '@angular/forms';

@Component({
  selector: 'app-achievo-input',
  imports: [ReactiveFormsModule],
  templateUrl: './achievo-input.html',
  styleUrl: './achievo-input.css'
})
export class AchievoInput {
  @Input() label!: string;
  @Input() placeholder = '';
  @Input() control!: FormControl<any>;
  @Input() editMode = false;
  @Input() type: string = "text";
}
