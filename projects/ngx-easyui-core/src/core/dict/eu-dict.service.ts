import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class EuDictService {

    constructor(private http: HttpClient) { }

    abstract getDictDataMaps(dictNames: string[]): Observable<any>

    abstract getDictDataValue(dictName: string, dictKey: string): Observable<any>

    abstract getDictDataObserable(dictName: string): Observable<any[]>

}