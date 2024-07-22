import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributePanelDefaultComponent } from './attribute-panel-default.component';

describe('AttributePanelDefaultComponent', () => {
  let component: AttributePanelDefaultComponent;
  let fixture: ComponentFixture<AttributePanelDefaultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttributePanelDefaultComponent]
    });
    fixture = TestBed.createComponent(AttributePanelDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
