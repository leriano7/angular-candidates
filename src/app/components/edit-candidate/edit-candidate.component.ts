import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Observable, switchMap } from "rxjs";
import { Candidate } from "src/app/models/candidate";
import { CandidatesService } from "src/app/services/candidates.service";

@Component({
  selector: "app-edit-candidate",
  templateUrl: "./edit-candidate.component.html",
  styleUrls: ["./edit-candidate.component.scss"],
})
export class EditCandidateComponent implements OnInit {
  public candidate$!: Observable<Candidate>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private candidatesService: CandidatesService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.candidate$ = this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        // 10 is the base of the number
        const selectedId = parseInt(params.get("id")!, 10);
        return this.candidatesService.getCandidate(selectedId);
      })
    );
  }

  public onSubmit = (candidate: Candidate) => {
    // TODO: we should check here if all validators are OK?
    // TO CONSULT: 
    this.candidatesService.update(candidate).subscribe(()=>{});
    this.router.navigate(["/"]);
  }

  public back = () => {
    this.location.back();
  }
}