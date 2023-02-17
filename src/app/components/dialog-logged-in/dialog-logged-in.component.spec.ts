import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLoggedInComponent } from './dialog-logged-in.component';

describe('DialogLoggedInComponent', () => {
  let component: DialogLoggedInComponent;
  let fixture: ComponentFixture<DialogLoggedInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLoggedInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
