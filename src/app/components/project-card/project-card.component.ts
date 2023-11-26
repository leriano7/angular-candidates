import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from 'src/app/models/project';
import { ProjectModalComponent } from '../project-modal/project-modal.component';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {

  constructor(public dialog: MatDialog) {}

  @Input() project! : Project;

  get technologies() : string {
    if(this.project?.technology?.length >= 1) {
      return this.project.technology.join(', ');
    }
    return '';
  }

  public editProject = () => {
    const dialogRef = this.dialog.open(ProjectModalComponent, {
      data: this.project
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The project dialog was closed');
      if (result) {
        // TODO: here we must work with the received  edited project
        //this.candidateService.remove(result.id).subscribe(()=>{
        //  this.outDestroy.emit(0);
        //});
      }
    });
  };

  public removeProject = () => {};

}
