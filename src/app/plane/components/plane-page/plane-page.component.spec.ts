import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanePageComponent } from './plane-page.component';

describe('PlanePageComponent', () => {
  let component: PlanePageComponent;
  let fixture: ComponentFixture<PlanePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanePageComponent]
    });
    fixture = TestBed.createComponent(PlanePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
