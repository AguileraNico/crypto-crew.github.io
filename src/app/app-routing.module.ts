import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LandingComponent } from './modules/private/landing.component';
import { ProposalsListComponent } from './modules/private/proposals-list/proposals-list.component';
import { ProposalDetailsComponent } from './modules/private/proposal-details/proposal-details.component';

const routes: Routes = [{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full',
}, {
  path: 'home',
  component: HomeComponent
}, {
  path: 'landing',
  component: LandingComponent,
  children: [{
    path: '',
    redirectTo: 'proposals',
    pathMatch: 'full'
  }, {
    path: 'proposals',
    component: ProposalsListComponent
  }, {
    path: ':id',
    component: ProposalDetailsComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
