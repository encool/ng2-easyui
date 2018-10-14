import { TestBed } from '@angular/core/testing';

import { NgxEasyuiService } from './ngx-easyui.service';

describe('NgxEasyuiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxEasyuiService = TestBed.get(NgxEasyuiService);
    expect(service).toBeTruthy();
  });
});
