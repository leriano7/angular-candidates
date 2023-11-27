import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Candidate } from 'src/app/models/candidate';
import { CandidatesService } from 'src/app/services/candidates.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss']
})
export class CandidateCardComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private candidateService: CandidatesService
  ) {}

  @Output() outDestroy = new EventEmitter<number>();

  ngOnInit(): void {
    this.seniority.junior = this.candidate?.experience === 'Junior';
    this.seniority.mid = this.candidate?.experience === 'Midlevel';
    this.seniority.senior = this.candidate?.experience === 'Senior';
    this.buildUniqueSkills();
  }

  @Input() candidate! : Candidate;

  public skills : {
    technology: string,
    experience: number
  } [] = [];

  public seniority = {
    junior: false,
    mid: false,
    senior : false
  };

  private buildUniqueSkills = () => {
    if(this.candidate && Array.isArray(this.candidate.previousProjects)) {
      // We define a new block function (to use only here).
      // This function returns true if not found or found in given index.
      
      const onlyUniqueSameExperience = (
        // Use to avoid repetitions with the same of experience.
        value : { technology: string, experience:number },
        index: number,
        self : { technology: string, experience:number }[]) : Boolean => {
          const found = self.findIndex((v : { technology: string, experience:number }) =>
            v.technology === value.technology && v.experience >= value.experience
          );
          return found === -1 || found === index;
      };

      const onlyUniqueDifferentExperience = (
        // Use to avoid repetitions with diferent values of experience.
        value : { technology: string, experience:number },
        index: number,
        self : { technology: string, experience:number }[]) : Boolean => {
          const found = self.findIndex((v : { technology: string, experience:number }) =>
            v.technology === value.technology && v.experience > value.experience
          );
          return found === -1 || found === index;
      };

      // It takes the biggest experience in one only project as the selected experience for technology.
      this.skills = this.candidate.previousProjects
          .map((project)=>{
            return project.technology.map((technology)=>{
              return {
                technology : technology,
                experience : project.experience
              }
            });
          })
          .flat()
          .filter(onlyUniqueSameExperience)
          .filter(onlyUniqueDifferentExperience);
    }
  };

  public remove = () => {
    // ConfirmationModalComponent created by us. It receives the candidate in constructor
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: this.candidate,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.candidateService.remove(result.id).subscribe(()=>{
          this.outDestroy.emit(0);
        });
      }
    });
  };
}
