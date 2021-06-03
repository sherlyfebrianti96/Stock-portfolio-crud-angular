import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  public isAdmin: boolean;

  constructor(private router: Router) {
    this.isAdmin = (this.router.url.indexOf('admin') >= 0);
  }

  ngOnInit(): void {
  }

}
