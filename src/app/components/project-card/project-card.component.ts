import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from 'src/app/models/project';
import { ProjectModalComponent } from '../project-modal/project-modal.component';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {

  constructor(public dialog: MatDialog) { }

  @Input() project!: Project;
  @Input() ind!: number;
  @Output() editionEmitter = new EventEmitter<{ i: number, p: Project }>();
  @Output() removalEmitter = new EventEmitter<number>();

  get technologies(): string {
    if (this.project?.technology?.length >= 1) {
      return this.project.technology.join(', ');
    }
    return '';
  }

  public editProject = () => {
    const dialogRef = this.dialog.open(ProjectModalComponent, {
      data: this.project
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.editionEmitter.emit({i: this.ind, p: result });
      }
    });
  };

  public removeProject = () => {
    // As it is not permanent, we do not show modal for this.
    this.removalEmitter.emit(this.ind);
  };

}
