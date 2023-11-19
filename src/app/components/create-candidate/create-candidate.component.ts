import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Candidate } from 'src/app/models/candidate';
import { CandidatesService } from 'src/app/services/candidates.service';

@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrls: ['./create-candidate.component.scss']
})
export class CreateCandidateComponent {

  constructor(
    private location: Location,
    private service : CandidatesService,
    private router: Router
    ){}

  public onSubmit = (candidate: Candidate) => {
    this.service.save(candidate).pipe(take(1)).subscribe();
    this.router.navigate(["/"]);
  }

  public back = () => {
    this.location.back();
  }

}
