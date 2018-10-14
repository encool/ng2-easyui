import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import {
    EuPageService
} from 'ngx-easyui-core'
// } from 'ng2-easyui'

@Injectable()
export class PageService extends EuPageService {

    constructor(public http: HttpClient) {
        super(http)
    }

    datas = [{ "categoryName": "考勤异常申诉", "categoryNo": "KQYCSS", "id": "kDlV3reHScenVuKlo4vBbw", "url": "f/abnormalappeal" },
    { "categoryName": "员工辞职申请", "categoryNo": "YGCZSQ", "id": "M3uMWZe7QG6Q22OtST7oUA", "url": "f/EmployeeLeave" },
    { "categoryName": "IVT终端下发", "categoryNo": "IVT_HAIR", "id": "Bqi444PKReOhDEAw6SvELg", "url": "f/terminalIVTHair" },
    { "categoryName": "人员入职培训", "categoryNo": "TrainInfo", "id": "brIpsXEdQAKW9ERrB1lLKw", "url": "f/EmployeeAddInfo" },
    { "categoryName": "合同扫描", "categoryNo": "CONTRACT_HTSM", "id": "gkDr2yejQ8mjfRaNo3qPUg", "url": "f/htsm" },
    { "categoryName": "选择事项类型", "categoryNo": "wfchoosemoduletype", "id": "WN1QogvMQha6MVvZN9ir6Q", "url": "f/wfchoosemoduletype" },
    { "categoryName": "科室工作任务", "categoryNo": "DEP_WORKTASK", "id": "uwrFNbRzRTODVPwKk0_hMw", "url": "f/DeptWorkTaskInfo" },
    { "categoryName": "人力资源面谈人", "categoryNo": "rlzymtr", "id": "UoaMniArQ-OyPM_kQZsxmw", "url": "f/humanresourceconversationform" },
    { "categoryName": "员工辞职原因", "categoryNo": "ygczyy", "id": "qJv2TN42R2yp4S-wnC6OWw", "url": "f/employeeleavereason" },
    { "categoryName": "科室(分中心)面谈记录", "categoryNo": "departnotes", "id": "NNEqYE6rRj6BXKvWyK-Spw", "url": "f/employeeinterviewnotes" }]
    /**
     * 
     * @param url 
     * @param rows 
     * @param page 
     * @param cond 
     * @param sidx sort index
     * @param sord sord col
     * @param _search 
     */
    getPage(url: string, rows: number, page: number,
        cond?: Object, sidx?: string, sord?: string, _search?: boolean): Promise<any> {
        // let urlSearchParams = new URLSearchParams();
        // urlSearchParams.set("rows", rows.toString());
        // urlSearchParams.set("page", page.toString());
        // urlSearchParams.set("sidx", sidx || "");
        // urlSearchParams.set("sord", sord || "asc");
        // urlSearchParams.set("_search", _search ? "true" : "false");
        // urlSearchParams.set("cond", JSON.stringify(cond));
        // let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        // let options = new RequestOptions({ headers: headers, search: urlSearchParams });
        return new Promise(
            /* executor */
            (resolve, reject) => {
                // debugger
                let offset = (page - 1) * rows
                let data = this.datas.slice().filter((data) => {
                    // debugger
                    for (let key in cond) {
                        if (cond[key]) {
                            let searchStr = data[key]
                            return searchStr.indexOf(cond[key]) != -1
                        } else {
                            return true
                        }
                    }
                    //没有条件不过滤
                    return true
                })
                let contents = data.splice(offset, offset + rows)
                resolve(
                    { "contents": contents, "pageIndex": page, "pageSize": rows, "total": this.datas.length, "totalPage": 16 }
                )
            }
        );
        // return this.http.get(url, options)
        //     .toPromise()
        //     .then((data) => { return data.json() })
    }

    getPageOb(url: string, rows: number, page: number,
        cond?: Object, sidx?: string, sord?: string, _search?: boolean): Observable<any> {
        let urlSearchParams = new HttpParams();
        urlSearchParams.set("rows", rows.toString());
        urlSearchParams.set("page", page.toString());
        urlSearchParams.set("sidx", sidx || "");
        urlSearchParams.set("sord", sord || "asc");
        urlSearchParams.set("_search", _search ? "true" : "false");
        urlSearchParams.set("cond", JSON.stringify(cond));
        let headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' });
        // let options = new RequestOptions({ headers: headers, search: urlSearchParams });
        return this.http.get(url, {
            headers: headers,
            params: urlSearchParams
        }).pipe(map((data) => {
            // debugger
            return data
        }))
    }

    getPageObByOffsetLimit(url: string, offset: number, limit: number,
        cond?: Object, sidx?: string, sord?: string, _search?: boolean): Observable<any> {
        // debugger
        let rows = limit
        let page = offset / limit + 1
        let urlSearchParams = new HttpParams();
        urlSearchParams.set("rows", rows.toString());
        urlSearchParams.set("page", page.toString());
        urlSearchParams.set("sidx", sidx || "");
        urlSearchParams.set("sord", sord || "asc");
        urlSearchParams.set("_search", _search ? "true" : "false");
        urlSearchParams.set("cond", JSON.stringify(cond));
        let headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' });
        // let options = new HttpHeaders({ headers: headers, search: urlSearchParams });
        return this.http.get(url, {
            headers: headers,
            params: urlSearchParams
        }).pipe(map((data) => {
            // debugger
            return data
        }))
    }

    getById(id: string) {
        let value = this.datas.find((value) => {
            return value.id == id
        })
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(value);
            }, 100);
        });
    }

    updateById(id: string, value: any) {
        let index = this.datas.findIndex((value) => {
            return value.id == id
        })
        value.id = id
        this.datas[index] = value
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(value);
            });
        });
    }

    id: number = 0
    addData(value) {
        value.id = this.id++
        this.datas.push(value)
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(value);
            });
        });
    }
}