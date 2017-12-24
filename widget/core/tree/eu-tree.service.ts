import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { TreeNodeDef } from "./tree.def";

export abstract class EuTreeService {

    constructor(public http: HttpClient) { }

    abstract getTreeNodes(url: string, cond?: Object): Promise<TreeNodeDef[]>

    abstract getTreeNodesOb(url: string, cond?: Object): Observable<TreeNodeDef[]>

}