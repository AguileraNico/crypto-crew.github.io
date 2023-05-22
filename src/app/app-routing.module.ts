import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LandingComponent } from './modules/private/landing.component';
import { ProposalsListComponent } from './modules/private/proposals-list/proposals-list.component';
import { ProposalDetailsComponent } from './modules/private/proposal-details/proposal-details.component';
import { ListComponent } from './modules/private/proposals-list/list/list.component';
import { NewProposalComponent } from './modules/private/proposals-list/new/new-proposal.component';

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
    component: ProposalsListComponent,
    children: [{
      path: '',
      redirectTo: 'list',
      pathMatch: 'full'
    }, {
      path: 'list',
      component: ListComponent
    }, {
      path: 'new',
      component: NewProposalComponent
    }]
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
