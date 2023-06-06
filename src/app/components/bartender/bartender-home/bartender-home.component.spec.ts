import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BartenderHomeComponent } from './bartender-home.component';

describe('BartenderHomeComponent', () => {
  let component: BartenderHomeComponent;
  let fixture: ComponentFixture<BartenderHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BartenderHomeComponent]
    });
    fixture = TestBed.createComponent(BartenderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
