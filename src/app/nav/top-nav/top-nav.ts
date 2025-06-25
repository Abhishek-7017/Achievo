import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-top-nav',
  imports: [],
  templateUrl: './top-nav.html',
  styleUrl: './top-nav.css'
})
export class TopNav {

  constructor(private modal:ModalService){}

  openModal($event:Event){
    $event.preventDefault();
    this.modal.toggleModal('auth');
  }
}
