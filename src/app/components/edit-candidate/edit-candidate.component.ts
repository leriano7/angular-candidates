import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Observable, switchMap, take } from "rxjs";
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
        return new Observable<Candidate>((observer)=>{
          if(!isNaN(selectedId)) {
            // It is a number.
            this.candidatesService.getCandidate(selectedId).pipe(take(1)).subscribe({
              next : (candidate: Candidate) => observer.next(candidate),
              error : () => this.router.navigate(["/"])
            });
          } else {
            // It is not a number.
            this.router.navigate(["/"])
          }          
        });
      })
    );
    
  }

  public onSubmit = (candidate: Candidate) => {
    this.candidatesService.update(candidate).pipe(take(1)).subscribe(() => {
      this.router.navigate(["/"]);
    });
  }

  public back = () => {
    this.location.back();
  }
}
