import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayArrayPanelComponent } from './display-array-panel.component';

describe('DisplayArrayPanelComponent', () => {
  let component: DisplayArrayPanelComponent;
  let fixture: ComponentFixture<DisplayArrayPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayArrayPanelComponent]
    });
    fixture = TestBed.createComponent(DisplayArrayPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
