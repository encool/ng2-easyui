import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';

// @Injectable()
export abstract class EfDictdataService {

    constructor(public http: HttpClient) { }

    abstract getDictDataObserable(dictName: string): Observable<any[]>

    protected handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}