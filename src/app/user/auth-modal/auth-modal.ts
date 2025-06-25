import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Modal } from '../../shared/modal/modal';
import { TabContainer } from '../../shared/tab-container/tab-container';

@Component({
  selector: 'app-auth-modal',
  imports: [Modal,TabContainer],
  templateUrl: './auth-modal.html',
  styleUrl: './auth-modal.css'
})
export class AuthModal implements OnInit,OnDestroy {

  constructor(private modal:ModalService){}
  
  ngOnInit(): void {
    this.modal.register('auth');
  }

  ngOnDestroy(): void {
    this.modal.unregister('auth');
  }

}
