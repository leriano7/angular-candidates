import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Candidate } from 'src/app/models/candidate';
import { CandidatesService } from 'src/app/services/candidates.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit, OnDestroy {

  constructor(public service: CandidatesService) {}

  ngOnInit(): void {
    this.drawList();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s)=>{
      s.unsubscribe();
    });
  }

  public candidates: Candidate[] = [];
  public subscriptions: Subscription[] = [];

  public deletedCard = () => {
    this.drawList();
  };

  private drawList() {
    const subscription = this.service
        .getCandidates().subscribe((candidates) => {
          this.candidates = candidates
        });
    this.subscriptions.push(subscription);
  }

}
