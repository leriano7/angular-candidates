import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from 'src/app/models/project';
import { ProjectModalComponent } from '../project-modal/project-modal.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {

  constructor(public dialog: MatDialog, private cdr: ChangeDetectorRef) {}

  @Input() projectList! : Array<Project>;

  public addProject = () => {
    const dialogRef = this.dialog.open(ProjectModalComponent, {
      data: null // Passing null components uses for for create
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const p = result as Project;
        this.projectList.push(p);
        this.cdr.detectChanges();
      }
    });
  };

  public projectEdited = (edited: any) => {
    const editedIndex = edited.i;
    const newEP = edited.p as Project;
    this.projectList[editedIndex] = Object.assign([],newEP);
  }

  public projectRemoved = (index : number) => {
    this.projectList.splice(index,1);
  }
}
