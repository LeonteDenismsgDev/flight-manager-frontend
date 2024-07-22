import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributePanelComponent } from './attribute-panel.component';

describe('AttributePanelComponent', () => {
  let component: AttributePanelComponent;
  let fixture: ComponentFixture<AttributePanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttributePanelComponent]
    });
    fixture = TestBed.createComponent(AttributePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
