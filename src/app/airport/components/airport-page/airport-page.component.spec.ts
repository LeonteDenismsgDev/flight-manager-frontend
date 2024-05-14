import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportPageComponent } from './airport-page.component';

describe('AirportPageComponent', () => {
  let component: AirportPageComponent;
  let fixture: ComponentFixture<AirportPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AirportPageComponent]
    });
    fixture = TestBed.createComponent(AirportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
