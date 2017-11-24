import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

import {
    EuBpmnService
} from '../../widget'
// } from 'ng2-easyui'

@Injectable()
export class BpmnService extends EuBpmnService {

    constructor(public http: Http) {
        super(http)
    }

    getModelInfo(id: string) {
        return new Promise<any>(resolve => {
            resolve({
            })
        })
    }

    saveModel() {
        return new Promise<any>(resolve => {
            resolve({
            })
        })
    }

    getProcessDefDiagramXml() {
        return new Promise<any>(resolve => {
            resolve({
            })
        })
    }

    getHighLights() {
        return new Promise<any>(resolve => {
            resolve({
            })
        })
    }
}