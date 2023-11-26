import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  @Input() projectList! : Array<Project>;

  public addProject = () => {};

  public projectEdited = (edited: any) => {
    const editedIndex = edited.i;
    const newEP = edited.p;
    this.projectList[editedIndex] = Object.assign({},newEP);
  }

  public projectRemoved = (index : number) => {
    this.projectList.splice(index,1);
  }
}
