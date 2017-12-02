import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";

import 'rxjs/Rx'

import {AppComponent} from './app.component';
import {GrantsComponent} from './grants/grants.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthorizeComponent} from './authorize/authorize.component';
import {AeHeaderComponent} from "./ae/ae-header/ae-header.component";
import {IdentityService} from "./shared/identity.service";

const routeConfig:Routes =  [
  {path: "", component: GrantsComponent},
  {path: "authorize", component: AuthorizeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    GrantsComponent,
    AuthorizeComponent,
    AeHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routeConfig, {useHash: true}),
    FormsModule
  ],
  providers: [IdentityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
