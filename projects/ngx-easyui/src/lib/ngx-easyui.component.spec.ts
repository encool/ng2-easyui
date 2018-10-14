import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxEasyuiComponent } from './ngx-easyui.component';

describe('NgxEasyuiComponent', () => {
  let component: NgxEasyuiComponent;
  let fixture: ComponentFixture<NgxEasyuiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxEasyuiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxEasyuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
