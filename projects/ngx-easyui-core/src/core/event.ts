import { BaseAction } from './action'

export abstract class Event {
    constructor(businessId: string, action: BaseAction) {
        this.businessId = businessId;
        this.action = action;
    }
    action: BaseAction;
    businessId: string;
}