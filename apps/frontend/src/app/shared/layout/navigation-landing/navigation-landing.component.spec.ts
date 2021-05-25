import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationLandingComponent } from './navigation-landing.component';

describe('NavigationLandingComponent', () => {
  let component: NavigationLandingComponent;
  let fixture: ComponentFixture<NavigationLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
