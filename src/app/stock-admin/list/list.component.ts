import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {StockAdminService} from "../../shared/service/stock-admin.service";
import {Stock} from "../../shared/interface/stock";
import {FormControl} from "@angular/forms";
import {MessageAlertType} from "../../shared/enum/message-alert-type";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class StockAdminListComponent implements OnInit {
  list: Array<Stock>;
  keyword: FormControl;
  message: string;
  messageType: MessageAlertType = MessageAlertType.Success;

  constructor(private router: Router, private stockAdminService: StockAdminService) {
    this.list = [];
    this.keyword = new FormControl('');
    this.message = '';
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

  removeStock(stock: Stock) {
    try {
      this.stockAdminService.removeStock(stock.vwdKey);
      this.messageType = MessageAlertType.Success;
      this.message = `[${stock.isin}] ${stock.name} has been deleted`;
    } catch (err: any) {
      this.messageType = MessageAlertType.Error;
      this.message = err.message;
    }
    this.resetPage();
  }

  resetPage() {
    this.keyword.setValue('');
    this.updateList();
  }

  updateExistingStock(stock: Stock) {
    this.router.navigate(['admin/update/' + stock.vwdKey]);
  }

}
