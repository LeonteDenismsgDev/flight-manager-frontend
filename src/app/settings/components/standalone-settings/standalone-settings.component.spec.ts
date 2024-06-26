import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandaloneSettingsComponent } from './standalone-settings.component';

describe('StandaloneSettingsComponent', () => {
  let component: StandaloneSettingsComponent;
  let fixture: ComponentFixture<StandaloneSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StandaloneSettingsComponent]
    });
    fixture = TestBed.createComponent(StandaloneSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
