import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export abstract class EuPageService {

    constructor(public http: Http) { }

    abstract getPage(url: string, rows: number, page: number,
        cond?: Object, sidx?: string, sord?: string, _search?: boolean): Promise<any>

    abstract getPageOb(url: string, pageSize: number, page: number,
        cond?: Object, sidx?: string, sord?: string, _search?: boolean): Observable<any>

    abstract getPageObByOffsetLimit(url: string, offset: number, limit: number,
        cond?: Object, sidx?: string, sord?: string, _search?: boolean): Observable<any>

}