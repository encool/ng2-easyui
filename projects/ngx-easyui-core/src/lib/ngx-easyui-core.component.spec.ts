import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxEasyuiCoreComponent } from './ngx-easyui-core.component';

describe('NgxEasyuiCoreComponent', () => {
  let component: NgxEasyuiCoreComponent;
  let fixture: ComponentFixture<NgxEasyuiCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxEasyuiCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxEasyuiCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
