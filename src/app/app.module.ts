import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { CandidateCardComponent } from './components/candidate-card/candidate-card.component';
import { AppMaterialModule } from './app-material.module';
import { APP_CONFIG, Config } from 'src/config/app.config';
import { CreateCandidateComponent } from './components/create-candidate/create-candidate.component';
import { CandidateFormComponent } from './components/candidate-form/candidate-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditCandidateComponent } from './components/edit-candidate/edit-candidate.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './auth.interceptor';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { ProjectModalComponent } from './components/project-modal/project-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CandidateListComponent,
    CandidateCardComponent,
    CreateCandidateComponent,
    CandidateFormComponent,
    EditCandidateComponent,
    ConfirmationModalComponent,
    LoginComponent,
    ProjectListComponent,
    ProjectCardComponent,
    ProjectModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: APP_CONFIG,
    useValue: Config
  },{
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
