import {ComponentRef, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private componentRef: ComponentRef<any> | undefined;

  setComponentRef(componentRef: ComponentRef<any>): void {
    this.componentRef = componentRef;
  }

  destroyComponent(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
  }
}
