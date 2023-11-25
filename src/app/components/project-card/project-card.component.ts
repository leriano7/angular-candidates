import { Component, Input } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {

  @Input() project! : Project;

  get technologies() : string {
    if(this.project?.technology?.length >= 1) {
      return this.project.technology.join(', ');
    }
    return '';
  }

  public editProject = () => {};

  public removeProject = () => {};

}
