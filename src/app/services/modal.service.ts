import { Injectable } from '@angular/core';

interface IModal{
  id:string;
  visible:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals:IModal[] = [];
  constructor() { }

  isModalOpen(id:string):boolean{
    return !!this.modals.find(element=>element.id === id)?.visible;
  }

  register(id:string){
    this.modals.push({
      id,
      visible:false
    });
  }
  unregister(id:string){
    this.modals.filter(element=>element.id!=id);
  }

  toggleModal(id:string){
    var modal = this.modals.find(element=>element.id===id);
    if(modal){
      modal.visible = !modal.visible;
    }
  }
}
