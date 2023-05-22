import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './modules/home/home.component';
import { MaterialModule } from './shared/material.module';
import { LandingComponent } from './modules/private/landing.component';
import { ProposalDetailsComponent } from './modules/private/proposal-details/proposal-details.component';
import { ProposalsListComponent } from './modules/private/proposals-list/proposals-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './modules/private/proposals-list/list/list.component';
import { NewProposalComponent } from './modules/private/proposals-list/new/new-proposal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingComponent,
    ProposalDetailsComponent,
    ProposalsListComponent,
    ListComponent,
    NewProposalComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
