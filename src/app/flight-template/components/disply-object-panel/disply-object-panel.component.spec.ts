import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplyObjectPanelComponent } from './disply-object-panel.component';

describe('DisplyObjectPanelComponent', () => {
  let component: DisplyObjectPanelComponent;
  let fixture: ComponentFixture<DisplyObjectPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplyObjectPanelComponent]
    });
    fixture = TestBed.createComponent(DisplyObjectPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
