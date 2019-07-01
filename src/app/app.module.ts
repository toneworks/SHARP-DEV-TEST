import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule, MatExpansionModule,
  MatIconModule,
  MatPaginatorModule,
  MatProgressSpinnerModule, MatSortModule,
  MatTableModule
} from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationComponent } from './authentication/authentication.component';
import {WorkspaceComponent} from './workspace/workspace.component';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { TransactionsListComponent } from './workspace/transactions-list/transactions-list.component';
import { CardComponent } from './workspace/card/card.component';

const appRoutes: Routes = [
  { path: 'authentication/login', component:  LoginComponent},
  { path: 'authentication/registration', component:  RegistrationComponent},
  { path: 'authentication/login/toReg', redirectTo: 'authentication/registration' },
  { path: 'workspace/new', component: CardComponent},
  { path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    WorkspaceComponent,
    LoginComponent,
    RegistrationComponent,
    TransactionsListComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    MatTableModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
