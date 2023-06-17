import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterDrinkListComponent } from './waiter-drink-list.component';

describe('WaiterDrinkListComponent', () => {
  let component: WaiterDrinkListComponent;
  let fixture: ComponentFixture<WaiterDrinkListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaiterDrinkListComponent]
    });
    fixture = TestBed.createComponent(WaiterDrinkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
