import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {StockManagementService} from "../../shared/service/stock-management.service";
import {Stock} from "../../shared/interface/stock";
import {Subscribable} from "rxjs";

@Component({
  selector: 'app-stock-management-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class StockManagementListComponent implements OnInit, OnDestroy {
  livePrice: Array<Stock>;
  myStock: Array<Stock>;
  interval: number;
  subscribeLivePrice: any;

  constructor(private stockManagementService: StockManagementService) {
    this.livePrice = [];
    this.myStock = [];
    this.interval = setInterval(() => {});
  }

  ngOnInit(): void {
    this.myStock = this.stockManagementService.list;
    this.interval = setInterval(() => {
      this.fetchLivePrice();
    }, 1000);
  }

  fetchLivePrice() {
    this.subscribeLivePrice = this.stockManagementService.getLivePrice().subscribe((result) => {
      this.livePrice = result as Array<Stock>;
    });
    this.setMyStockCurrentValue();
  }

  setMyStockCurrentValue() {
    this.myStock.map((stock: Stock) => {
      const liveStock = this.livePrice.find(item => (item.vwdKey === stock.vwdKey));
      stock.currentValue = liveStock?.price || 0;
      return stock;
    });
  }

  buyStock(stock: Stock) {
    this.stockManagementService.buyStock(stock);
  }

  removeStock(stock: Stock) {
    this.stockManagementService.removeStock(stock);
  }

  getBuyValue(stock: Stock) {
    const price = stock.price || 0;
    const quantity = stock.quantity || 0
    return price * quantity;
  }

  getCurrentValue(stock: Stock) {
    const currentValue = stock.currentValue || 0;
    const quantity = stock.quantity || 0
    return currentValue * quantity;
  }

  getYield(stock: Stock) {
    const currentValue = stock.currentValue || 0;
    const price = stock.price || 0;
    return (currentValue - price) / price * 100;
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.subscribeLivePrice.unsubscribe();
  }

}
