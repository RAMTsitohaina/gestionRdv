import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModContactComponent } from './mod-contact/mod-contact.component';
import { ModRdvComponent } from './mod-rdv/mod-rdv.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { TopBarComponent } from './top-bar/top-bar.component';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ContactManageComponent } from './mod-contact/contact-manage/contact-manage.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmContactComponent } from './mod-contact/confirm-contact/confirm-contact.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { RdvManageComponent } from './mod-rdv/rdv-manage/rdv-manage.component';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ConfirmRdvComponent } from './mod-rdv/confirm-rdv/confirm-rdv.component';


@NgModule({
  declarations: [
    AppComponent,
    ModContactComponent,
    ModRdvComponent,
    TopBarComponent,
    ContactManageComponent,
    ConfirmContactComponent,
    RdvManageComponent,
    ConfirmRdvComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatGridListModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    FullCalendarModule,
    CommonModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
