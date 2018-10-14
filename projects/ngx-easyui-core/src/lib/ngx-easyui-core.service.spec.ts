import { TestBed } from '@angular/core/testing';

import { NgxEasyuiCoreService } from './ngx-easyui-core.service';

describe('NgxEasyuiCoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxEasyuiCoreService = TestBed.get(NgxEasyuiCoreService);
    expect(service).toBeTruthy();
  });
});
