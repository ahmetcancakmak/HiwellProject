import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsByClientListingPageComponent } from './appointments-by-client-listing-page.component';

describe('AppointmentsByClientListingPageComponent', () => {
  let component: AppointmentsByClientListingPageComponent;
  let fixture: ComponentFixture<AppointmentsByClientListingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentsByClientListingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsByClientListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
