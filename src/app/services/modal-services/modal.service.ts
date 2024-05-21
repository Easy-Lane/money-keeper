import {ComponentRef, Injectable} from '@angular/core';
import {RegisterComponent} from "../../components/authorization/register/register.component";
import {LoginComponent} from "../../components/authorization/login/login.component";

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private componentRef: ComponentRef<RegisterComponent> | ComponentRef<LoginComponent> | undefined;

    setComponentRef(componentRef: ComponentRef<LoginComponent> | ComponentRef<RegisterComponent>): void {
        this.componentRef = componentRef;
    }

    destroyComponent(): void {
        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = undefined;
        }
    }
}
