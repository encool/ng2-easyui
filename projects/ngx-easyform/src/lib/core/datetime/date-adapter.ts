import { Injectable } from "@angular/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import * as _moment from 'moment';
import { Moment } from 'moment';

// import {default as _rollupMoment, Moment} from 'moment';

// const moment = _rollupMoment || _moment;
@Injectable()
export class EfDateAdapter extends MomentDateAdapter {

    parse(value: any, parseFormat: string | string[]): Moment | null {
        return super.parse(value, parseFormat)
    }

    deserialize(value: any): Moment | null {
        if (value && typeof value == 'string'
            && (value.length == 13 || value.length == 10) && parseInt(value)) {
            return _moment.unix(parseInt(value))
        } else if (value && typeof value == 'number') {
            if(value/1000000000 > 1000){
                return _moment.unix(value/1000)
            }else{
                return _moment.unix(value)
            }
        } else {
            return super.deserialize(value)
        }
    }
}