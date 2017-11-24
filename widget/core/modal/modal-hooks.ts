import { ModalAction } from './modal.action'
import { Observable } from 'rxjs/Observable';

export interface OnModalAction {
    onModalAction?(modalAction: ModalAction): any | Observable<any>;
    onModalClose(): any | Observable<any>;
    onModalDismiss(): any | Observable<any>;
}