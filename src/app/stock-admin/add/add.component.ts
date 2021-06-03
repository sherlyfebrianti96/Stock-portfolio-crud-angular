import {Component, OnInit} from '@angular/core';
import {Stock} from "../../shared/interface/stock";
import {StockAdminService} from "../../shared/service/stock-admin.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class StockAdminAddComponent implements OnInit {
  errorMessage: string;

  constructor(private stockAdminService: StockAdminService, private router: Router) {
    this.errorMessage = '';
  }

  ngOnInit(): void {
  }

  async addNewStock(value: any) {
    this.errorMessage = '';
    const stock: Stock = value as Stock;
    try {
      this.stockAdminService.addNewStock(stock);
      await this.router.navigate(['admin/list']);
    } catch (err: any) {
      this.errorMessage = err.message;
    }
  }

}
