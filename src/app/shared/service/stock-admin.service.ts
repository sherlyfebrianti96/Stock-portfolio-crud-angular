import {Injectable} from '@angular/core';
import {Stock} from "../interface/stock";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StockAdminService {
  private stockList: Array<Stock>;
  private stockAdminKey: string;

  constructor(private http: HttpClient) {
    this.stockAdminKey = 'stock-admin';
    this.stockList = [];
    this.setInitialFavoriteStock();
    this.syncStockList();
  }

  setInitialFavoriteStock() {
    if (!localStorage.getItem(this.stockAdminKey)) {
      this.addNewStock('AALB.NL');
      this.addNewStock('ABN.NL');
      this.addNewStock('ADYEN.NL');
      this.addNewStock('AGN.NL');
      this.addNewStock('AD.NL');
    }
  }

  getList(keyword?: string) {
    this.syncStockList();
    let list = this.stockList;
    if (keyword) {
      list = this.stockList.filter(
        (item: Stock) => (
          item.name?.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) ||
          item.vwdKey?.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
        )
      );
    }
    return list;
  }

  async addNewStock(vwdKey?: string) {
    const stock: Stock = {vwdKey};
    if (this.stockExist(stock)) {
      throw new Error('Stock has been exist');
    } else {
      await this.getLiveStock(stock?.vwdKey || '').then((result: Stock) => {
        this.stockList.push({vwdKey: result.vwdKey, name: result.name});
        this.renewStockAdmin();
      }, () => {
        throw new Error('Stock not found.');
      });
    }
  }

  renewStockAdmin() {
    localStorage.removeItem(this.stockAdminKey);
    localStorage.setItem(this.stockAdminKey, JSON.stringify(this.stockList));
  }

  stockExist(stock: Stock) {
    return !!this.stockList.find((item: Stock) => (item.vwdKey?.toLocaleLowerCase() === stock.vwdKey?.toLocaleLowerCase()));
  }

  findStockByUuid(uuid?: String) {
    this.syncStockList();
    return this.stockList.find((item: Stock) => (item.vwdKey === uuid));
  }

  syncStockList() {
    const stockStr = localStorage.getItem(this.stockAdminKey) || '[]';
    this.stockList = JSON.parse(stockStr);
  }

  removeStock(uuid?: String) {
    this.syncStockList();
    const itemKey = this.stockList.findIndex((item: Stock) => (item.vwdKey === uuid));
    if (itemKey >= 0) {
      this.stockList.splice(itemKey, 1);
      this.renewStockAdmin();
    } else {
      throw new Error('Cannot remove non-existing Stock');
    }
  }

  async updateExistingStock(oldVwdKey?: string, newVwdKey?: string) {
    this.syncStockList();
    const stock: Stock = {vwdKey: oldVwdKey};
    const existingIndex = this.stockList.findIndex((item: Stock) => (item.vwdKey === stock.vwdKey));
    if (existingIndex >= 0) {
      await this.getLiveStock(newVwdKey || '').then((result: Stock) => {
        this.stockList[existingIndex] = {vwdKey: result.vwdKey, name: result.name};
        this.renewStockAdmin();
      }, () => {
        throw new Error('Stock not found.');
      });
    } else {
      throw new Error('Stock does not exist');
    }
  }

  async getLiveStock(name: string) {
    return await this.http.get(`https://test.solutions.vwdservices.com/internal/intake-test/sample-data/price-data/${name}`).toPromise();
  }
}
