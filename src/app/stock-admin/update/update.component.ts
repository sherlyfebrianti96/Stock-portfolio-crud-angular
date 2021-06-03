import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Stock} from "../../shared/interface/stock";
import {StockAdminService} from "../../shared/service/stock-admin.service";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class StockAdminUpdateComponent implements OnInit {
  existingStock: Stock | null;

  constructor(private route: ActivatedRoute, private stockAdminService: StockAdminService, private router: Router) {
    this.existingStock = null;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const uuid = params['uuid'];
      this.validateUuid(uuid);
    });
  }

  async validateUuid(uuid: String) {
    this.existingStock = this.stockAdminService.findStockByUuid(uuid) || null;
    if (!this.existingStock) {
      await this.router.navigate(['admin/list']);
    }
  }

}
