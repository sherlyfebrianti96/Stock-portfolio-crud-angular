import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Stock} from "../../shared/interface/stock";
import {StockAdminService} from "../../shared/service/stock-admin.service";
import {MessageAlertType} from "../../shared/enum/message-alert-type";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class StockAdminUpdateComponent implements OnInit {
  existingStock: Stock | null;
  errorMessage: string;
  errorType: MessageAlertType = MessageAlertType.Error;
  uuid: string;

  constructor(private route: ActivatedRoute, private stockAdminService: StockAdminService, private router: Router) {
    this.existingStock = null;
    this.errorMessage = '';
    this.uuid = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.uuid = params['uuid'];
      this.validateUuid(this.uuid);
    });
  }

  async validateUuid(uuid: String) {
    this.existingStock = this.stockAdminService.findStockByUuid(uuid) || null;
    if (!this.existingStock) {
      await this.router.navigate(['admin/list']);
    }
  }

  async updateExistingStock(value: any) {
    this.errorMessage = '';
    const stock: Stock = value as Stock;
    try {
      await this.stockAdminService.updateExistingStock(this.uuid, stock.vwdKey);
      await this.router.navigate(['admin/list']);
    } catch (err: any) {
      this.errorMessage = err.message;
    }
  }

}
