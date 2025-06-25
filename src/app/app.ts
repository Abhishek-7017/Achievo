import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNav } from './nav/top-nav/top-nav';
import { BottomNav } from './nav/bottom-nav/bottom-nav';
import { AuthModal } from './user/auth-modal/auth-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,TopNav,BottomNav,AuthModal],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'Achievo';
}
