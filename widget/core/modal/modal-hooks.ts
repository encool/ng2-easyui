import { ModalAction } from './modal.action'
import { Observable } from 'rxjs/Observable';

export interface OnModalAction {
    onModalAction?(modalAction: ModalAction): any | Observable<any>;
    onModalClose(modalAction: ModalAction): any | Observable<any>;
    onModalDismiss(modalAction: ModalAction): any | Observable<any>;
}