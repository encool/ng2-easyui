import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

export abstract class EuDictService {

    constructor(private http: Http) { }

    abstract getDictDataMaps(dictNames: string[]): Observable<any>

    abstract getDictDataValue(dictName: string, dictKey: string): Observable<any>

    abstract getDictDataObserable(dictName: string): Observable<any[]>

}