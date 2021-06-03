import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StockManagementListComponent} from "./stock-management/list/list.component";
import {StockAdminListComponent} from "./stock-admin/list/list.component";
import {StockAdminAddComponent} from "./stock-admin/add/add.component";
import {StockAdminUpdateComponent} from "./stock-admin/update/update.component";

const routes: Routes = [
  {
    path: 'list',
    component: StockManagementListComponent
  },
  {
    path: 'admin',
    children: [
      {
        path: 'list',
        component: StockAdminListComponent
      },
      {
        path: 'add',
        component: StockAdminAddComponent
      },
      {
        path: 'update/:uuid',
        component: StockAdminUpdateComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full',
  },
  // {
  //   path: '**',
  //   component: PageNotFoundComponent
  // },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
