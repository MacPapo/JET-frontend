import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillFormComponent } from './bill-form.component';

describe('BillFormComponent', () => {
  let component: BillFormComponent;
  let fixture: ComponentFixture<BillFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillFormComponent]
    });
    fixture = TestBed.createComponent(BillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
