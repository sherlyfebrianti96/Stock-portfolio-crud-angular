import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {StockManagementListComponent} from "./stock-management/list/list.component";
import {StockAdminListComponent} from './stock-admin/list/list.component';
import {StockAdminAddComponent} from './stock-admin/add/add.component';

@NgModule({
  declarations: [
    AppComponent,
    StockManagementListComponent,
    StockAdminListComponent,
    StockAdminAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
