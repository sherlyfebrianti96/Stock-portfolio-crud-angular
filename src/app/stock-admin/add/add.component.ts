import {Component, OnInit} from '@angular/core';
import {Stock} from "../../shared/interface/stock";
import {StockAdminService} from "../../shared/service/stock-admin.service";
import {Router} from "@angular/router";
import {MessageAlertType} from "../../shared/enum/message-alert-type";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class StockAdminAddComponent implements OnInit {
  errorMessage: string;
  errorType: MessageAlertType = MessageAlertType.Error;

  constructor(private stockAdminService: StockAdminService, private router: Router) {
    this.errorMessage = '';
  }

  ngOnInit(): void {
  }

  async addNewStock(value: any) {
    this.errorMessage = '';
    const stock: Stock = value as Stock;
    try {
      await this.stockAdminService.addNewStock(stock.vwdKey);
      await this.router.navigate(['admin/list']);
    } catch (err: any) {
      this.errorMessage = err.message;
    }
  }

}
