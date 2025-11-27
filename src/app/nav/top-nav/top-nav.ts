import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-top-nav',
  imports: [],
  templateUrl: './top-nav.html',
  styleUrl: './top-nav.css'
})
export class TopNav {
  
  constructor(@Inject(PLATFORM_ID) private platformId:any, private modal:ModalService,private authService:AuthService){}
  
  openModal($event:Event){
    $event.preventDefault();
    this.modal.toggleModal('auth');
  }

  logout() {
    this.authService.logout();
  }
  
  isLoggedIn():boolean{
    return this.authService.isLoggedIn();
  }
}
