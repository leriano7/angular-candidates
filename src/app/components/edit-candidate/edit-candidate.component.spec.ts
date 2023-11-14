import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCandidateComponent } from './edit-candidate.component';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_CONFIG, Config } from 'src/config/app.config';

describe('EditCandidateComponent', () => {
  let component: EditCandidateComponent;
  let fixture: ComponentFixture<EditCandidateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [ RouterTestingModule ],
      declarations: [ EditCandidateComponent ],
      providers : [{
        provide: APP_CONFIG,
        useValue: Config,
      }]
    });
    fixture = TestBed.createComponent(EditCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
