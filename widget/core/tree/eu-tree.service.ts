import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { EuTreeNode } from "./tree.def";

export abstract class EuTreeService {

    constructor(public http: HttpClient) { }

    abstract getTreeNodes(url: string, node?: EuTreeNode, cond?: Object): Promise<EuTreeNode[]>

    abstract getTreeNodesOb(url: string, node?: EuTreeNode, cond?: Object): Observable<EuTreeNode[]>

}