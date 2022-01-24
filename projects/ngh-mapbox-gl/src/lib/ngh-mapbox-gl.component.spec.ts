import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NghMapboxGlComponent } from './ngh-mapbox-gl.component';

describe('NghMapboxGlComponent', () => {
  let component: NghMapboxGlComponent;
  let fixture: ComponentFixture<NghMapboxGlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NghMapboxGlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NghMapboxGlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
