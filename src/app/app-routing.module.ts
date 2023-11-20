import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { CreateCandidateComponent } from './components/create-candidate/create-candidate.component';
import { EditCandidateComponent } from './components/edit-candidate/edit-candidate.component';
import { authenticationGuard } from './authentication.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: "",
    component: CandidateListComponent,
  },
  {
    path: "create",
    canActivate : [authenticationGuard],
    component: CreateCandidateComponent,
  },
  {
    path: "edit/:id",
    canActivate : [authenticationGuard],
    component: EditCandidateComponent,
  },
  {
    path : "login",
    component : LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
