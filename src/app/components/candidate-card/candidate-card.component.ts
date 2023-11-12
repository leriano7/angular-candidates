import { Component, Input, OnInit } from '@angular/core';
import { Candidate } from 'src/app/models/candidate';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss']
})
export class CandidateCardComponent implements OnInit {

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
      const onlyUnique = (
        value : { technology: string, experience:number }, 
        index: number, 
        self : { technology: string, experience:number }[]) : Boolean => {          
          const found = self.findIndex((v : { technology: string, experience:number })=>
            v.technology === value.technology && v.experience > value.experience
          );
          return found === -1 || found === index;
      };

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
          .filter(onlyUnique);
    }
  };
}
