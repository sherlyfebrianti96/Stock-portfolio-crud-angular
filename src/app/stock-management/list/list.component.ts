import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-stock-management-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class StockManagementListComponent implements OnInit {
  public isAdmin: boolean;

  constructor(private router: Router) {
    this.isAdmin = (this.router.url.indexOf('admin') >= 0);
  }

  ngOnInit(): void {
  }

}
