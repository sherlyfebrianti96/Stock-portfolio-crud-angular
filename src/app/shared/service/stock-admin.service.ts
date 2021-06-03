import {Injectable} from '@angular/core';
import {Stock} from "../interface/stock";
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class StockAdminService {
  private stockList: Array<Stock>;
  private stockAdminKey: string;

  constructor() {
    this.stockAdminKey = 'stock-admin';
    this.stockList = [];
    this.updateStockList();
  }

  getList(keyword?: string) {
    this.updateStockList();
    let list = this.stockList;
    if (keyword) {
      list = this.stockList.filter(
        (item: Stock) => (
          item.name?.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) ||
          item.isin?.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
        )
      );
    }
    return list;
  }

  addNewStock(stock: Stock) {
    stock.vwdKey = uuid.v4();
    if (this.stockExist(stock)) {
      throw new Error('Stock has been exist');
    } else {
      this.stockList.push(stock);
      this.renewStockAdmin();
    }
  }

  renewStockAdmin() {
    localStorage.removeItem(this.stockAdminKey);
    localStorage.setItem(this.stockAdminKey, JSON.stringify(this.stockList));
  }

  stockExist(stock: Stock) {
    return !!this.stockList.find((item: Stock) => (item.isin === stock.isin));
  }

  updateStockList() {
    const stockStr = localStorage.getItem(this.stockAdminKey) || '[]';
    this.stockList = JSON.parse(stockStr);
  }
}
