import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsListingPageComponent } from './appointments-listing-page.component';

describe('AppointmentsListingPageComponent', () => {
  let component: AppointmentsListingPageComponent;
  let fixture: ComponentFixture<AppointmentsListingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentsListingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
