import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StockListComponent} from "./stock-list/stock-list.component";

const routes: Routes = [
  {
    path: 'list',
    component: StockListComponent
  },
  {
    path: 'admin',
    children: [
      {
        path: 'list',
        component: StockListComponent
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
export class AppRoutingModule { }
