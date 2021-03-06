import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { JobComponent } from './pages/job/job.component';
import { HeaderPageComponent } from './partials/header-page/header-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { JobEditComponent } from './pages/job-edit/job-edit.component';
import { JobService } from './services/JobService';
import { ProfileService } from './services/ProfileService';
import { JobBudgetComponent } from './shared/job-budget/job-budget.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    JobComponent,
    HeaderPageComponent,
    ProfileComponent,
    JobEditComponent,
    JobBudgetComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [ProfileService, JobService],
  bootstrap: [AppComponent],
})
export class AppModule {}
