import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentsListingsComponent } from './apartments-listings.component';

describe('ApartmentsListingsComponent', () => {
  let component: ApartmentsListingsComponent;
  let fixture: ComponentFixture<ApartmentsListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApartmentsListingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentsListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
