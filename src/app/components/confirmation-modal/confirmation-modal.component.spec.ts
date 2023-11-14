import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [AppMaterialModule],
      declarations: [ConfirmationModalComponent],
      providers : [{
        provide : MAT_DIALOG_DATA,
        useValue: {}
      },{
        provide : MatDialogRef<ConfirmationModalComponent>,
        useValue : {}
      }]
    });
    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
