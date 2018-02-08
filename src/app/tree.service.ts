import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {
    EuTreeService, EuTreeNode
} from 'ng2-easyui.core'
// } from 'ng2-easyui'

@Injectable()
export class TreeService extends EuTreeService {

    constructor(public http: HttpClient) {
        super(http)
    }

    getTreeNodes(url, node, params): Promise<EuTreeNode[]> {
        debugger
        return new Promise<EuTreeNode[]>(resolve => {
            resolve([
                { id: this.guid(), name: 'child2.1', hasChildren: true },
                {
                    id: this.guid(),
                    name: 'child2.2',
                    children: [
                        { id: this.guid(), name: 'subsub' }
                    ]
                }
            ])
        })
    }

    getTreeNodesOb(url, node, params): Observable<EuTreeNode[]> {
        return null

    }

    private guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

}