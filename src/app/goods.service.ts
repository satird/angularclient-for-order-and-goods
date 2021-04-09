import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Goods } from "./goods";

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http:HttpClient) { }

  getGoodsList(): Observable<Goods[]> {
    return this.http.get<Goods[]>(this.baseUrl + 'goods-list');
  }
  createGoods(goods: Goods): Observable<object> {
    return this.http.post(this.baseUrl + 'save-goods', goods);
  }
  deleteGoods(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'delete-goods/' +id, {responseType: 'text'});
  }
  getGoods(id: number): Observable<Object> {
    return this.http.get(this.baseUrl + 'goods/' + id);
  }
  updateGoods(id: number, value: any):Observable<Object> {
    return this.http.post(this.baseUrl + 'update-goods/' + id, value);
  }

}
