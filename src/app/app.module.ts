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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    JobComponent,
    HeaderPageComponent,
    ProfileComponent,
    JobEditComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [ProfileService, JobService],
  bootstrap: [AppComponent],
})
export class AppModule {}
