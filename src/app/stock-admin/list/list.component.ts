import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class StockAdminListComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  async addNewStock() {
    await this.router.navigate(['admin/add']);
  }

}
