import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFailedDialogComponent } from './registration-failed-dialog.component';

describe('RegistrationFailedDialogComponent', () => {
  let component: RegistrationFailedDialogComponent;
  let fixture: ComponentFixture<RegistrationFailedDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationFailedDialogComponent]
    });
    fixture = TestBed.createComponent(RegistrationFailedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
