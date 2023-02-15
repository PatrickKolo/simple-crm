import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteNoteComponent } from './dialog-delete-note.component';

describe('DialogDeleteNoteComponent', () => {
  let component: DialogDeleteNoteComponent;
  let fixture: ComponentFixture<DialogDeleteNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeleteNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
