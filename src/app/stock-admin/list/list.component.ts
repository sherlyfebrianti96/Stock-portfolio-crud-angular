import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {StockAdminService} from "../../shared/service/stock-admin.service";
import {Stock} from "../../shared/interface/stock";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class StockAdminListComponent implements OnInit {
  list: Array<Stock>;
  keyword: FormControl;

  constructor(private router: Router, private stockAdminService: StockAdminService) {
    this.list = [];
    this.keyword = new FormControl('');
  }

  ngOnInit(): void {
    this.resetPage();
  }

  async addNewStock() {
    await this.router.navigate(['admin/add']);
  }

  updateList() {
    this.list = this.stockAdminService.getList(this.keyword.value);
  }

  removeStock(uuid?: string) {
    this.stockAdminService.removeStock(uuid);
    this.resetPage();
  }

  resetPage() {
    this.keyword.setValue('');
    this.updateList();
  }

}
