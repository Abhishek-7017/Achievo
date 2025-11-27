import { Component,ChangeDetectionStrategy } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-bottom-nav',
  imports: [MatIconModule, RouterLink],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomNav {

}
