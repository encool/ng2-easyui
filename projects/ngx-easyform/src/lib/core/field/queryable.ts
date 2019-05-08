import { QueryOperate } from './query-operate';

export interface Queryable {
    op?: QueryOperate //操作 eq gt lt like 等等
}