import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModContactComponent } from './mod-contact/mod-contact.component';
import { ModRdvComponent } from './mod-rdv/mod-rdv.component';

const routes: Routes = [
  {
    path: '',
    component: ModRdvComponent
  },
  // Contact
  {
    path: 'contact',
    component: ModContactComponent
  },
  // Rendez-vous
  {
    path: 'rdv',
    component: ModRdvComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
