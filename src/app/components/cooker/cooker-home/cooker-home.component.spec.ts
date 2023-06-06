import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookerHomeComponent } from './cooker-home.component';

describe('CookerHomeComponent', () => {
  let component: CookerHomeComponent;
  let fixture: ComponentFixture<CookerHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CookerHomeComponent]
    });
    fixture = TestBed.createComponent(CookerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
