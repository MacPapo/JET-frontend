import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterFoodListComponent } from './waiter-food-list.component';

describe('WaiterFoodListComponent', () => {
  let component: WaiterFoodListComponent;
  let fixture: ComponentFixture<WaiterFoodListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaiterFoodListComponent]
    });
    fixture = TestBed.createComponent(WaiterFoodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
