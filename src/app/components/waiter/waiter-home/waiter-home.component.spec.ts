import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterHomeComponent } from './waiter-home.component';

describe('WaiterHomeComponent', () => {
  let component: WaiterHomeComponent;
  let fixture: ComponentFixture<WaiterHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaiterHomeComponent]
    });
    fixture = TestBed.createComponent(WaiterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
