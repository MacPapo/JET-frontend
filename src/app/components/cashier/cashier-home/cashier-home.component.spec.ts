import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierHomeComponent } from './cashier-home.component';

describe('CashierHomeComponent', () => {
  let component: CashierHomeComponent;
  let fixture: ComponentFixture<CashierHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashierHomeComponent]
    });
    fixture = TestBed.createComponent(CashierHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
