import { ValidatorFn, AsyncValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { Queryable } from './queryable'
import { QueryOperate } from './query-operate'

export abstract class FieldBase<T> implements Queryable {
  value?: T;
  id?: string
  selector?: string
  key: string;
  label?: string;
  span?: number
  required?: boolean;
  order?: number;
  controlType?: string;
  validator?: ValidatorFn | ValidatorFn[]
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
  labelOffset?: number
  labelSpan?: number
  isObject?: boolean //废弃
  disabled?: boolean
  hidden?: boolean
  params?: any
  statusChange?: (string) => void
  valueChange?: (string) => void
  op?: QueryOperate
  _check?: Function //各自field的check函数？
  _view?: any
  _control?: AbstractControl
  constructor(options: {
    value?: T,
    id?: string,
    selector?: string
    key?: string,
    label?: string,
    span?: number,
    required?: boolean,
    validator?: ValidatorFn | ValidatorFn[],
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
    order?: number,
    controlType?: string
    labelOffset?: number
    labelSpan?: number
    isObject?: boolean //废弃
    disabled?: boolean
    hidden?: boolean
    statusChange?: (string) => void
    valueChange?: (any) => void
    op?: QueryOperate
    params?: Object
  }) {
    // debugger
    this.value = options.value;
    this.id = options.id;
    this.selector = options.selector || this.controlType; //文本框等基础表单元素可以让 controlType 等于selector
    this.key = options.key || '';
    this.label = options.label || '';
    this.span = options.span == null ? 6 : options.span
    this.required = !!options.required;
    this.order = options.order == null ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.validator = options.validator
    this.asyncValidator = options.asyncValidator
    this.labelOffset = options.labelOffset == null ? 75 : options.labelOffset
    this.labelSpan = options.labelSpan == null ? 3 : options.labelSpan
    this.isObject = options.isObject == null ? false : options.isObject
    this.disabled = options.disabled == null ? false : options.disabled
    this.hidden = options.hidden == null ? false : options.hidden
    this.statusChange = options.statusChange
    this.valueChange = options.valueChange
    this.op = options.op || QueryOperate.nomal
    this.params = options.params
  }
}
