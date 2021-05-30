import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishOrdersComponent } from './finish-orders.component';

describe('FinishOrdersComponent', () => {
  let component: FinishOrdersComponent;
  let fixture: ComponentFixture<FinishOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
