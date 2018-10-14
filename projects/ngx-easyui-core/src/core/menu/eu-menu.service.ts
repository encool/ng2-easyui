import { HttpClient } from '@angular/common/http';
import { Menu } from "./menu";

export abstract class EuMenuService {

    appMenus: Menu[]

    constructor(public http: HttpClient) { }

    abstract getApplicationMenus(): Promise<Menu[]>

}