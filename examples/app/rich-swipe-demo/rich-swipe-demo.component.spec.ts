import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichSwipeDemoComponent } from './rich-swipe-demo.component';

describe('RichSwipeDemoComponent', () => {
  let component: RichSwipeDemoComponent;
  let fixture: ComponentFixture<RichSwipeDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichSwipeDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichSwipeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
