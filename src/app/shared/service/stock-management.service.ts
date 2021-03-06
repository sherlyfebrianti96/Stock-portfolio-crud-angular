import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Stock} from "../interface/stock";
import {StockAdminService} from "./stock-admin.service";

@Injectable({
  providedIn: 'root'
})
export class StockManagementService {
  private myStock: Array<Stock>;
  private myStockKey: string = 'my-stock';

  constructor(private http: HttpClient, private stockAdminService: StockAdminService) {
    this.myStock = [];
  }

  get list() {
    this.syncStockList();
    return this.myStock;
  }

  getLivePrice() {
    const stockQS = this.getAllStockQS();
    return this.http.get(`https://test.solutions.vwdservices.com/internal/intake-test/sample-data/price-data${stockQS}`);
  }

  getAllStockQS() {
    const favoriteStock = this.stockAdminService.getList();
    return favoriteStock.reduce((accumulator: any, stock: Stock, index: number) => {
      let result = accumulator;
      if (index > 0) {
        result += '&';
      }
      result += `vwdkey=${stock.vwdKey}`;
      return result;
    }, '?');
  }

  syncStockList() {
    const stockStr = localStorage.getItem(this.myStockKey) || '[]';
    this.myStock = JSON.parse(stockStr);
  }

  buyStock(stock: Stock) {
    const stockIndex = this.getStockIndex(stock);
    if (stockIndex >= 0) {
      const existing: Stock = {...this.myStock[stockIndex]};
      this.myStock[stockIndex].quantity = existing.quantity ? existing.quantity + 1 : 1;
    } else {
      stock.quantity = 1;
      this.myStock.push(stock);
    }
    this.renewStock();
  }

  renewStock() {
    localStorage.removeItem(this.myStockKey);
    localStorage.setItem(this.myStockKey, JSON.stringify(this.myStock));
  }

  removeStock(stock: Stock) {
    const stockIndex = this.getStockIndex(stock);
    if (stockIndex >= 0) {
      const quantity = this.myStock[stockIndex].quantity || 0;
      if (quantity > 1) {
        this.myStock[stockIndex].quantity = quantity - 1;
      } else {
        this.myStock.splice(stockIndex, 1);
      }
    }
    this.renewStock();
  }

  getStockIndex(stock: Stock) {
    return this.myStock.findIndex((item: Stock) => (item.vwdKey === stock.vwdKey));
  }
}
