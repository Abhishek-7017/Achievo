import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class Modal {
  @Input() modalId='';

  constructor(public modalService:ModalService){}

  closeModal(){
    this.modalService.toggleModal('auth');
  }
}
