import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Order} from "./order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl: string;

  constructor(private http:HttpClient) {
    this.baseUrl = 'http://localhost:8080/api/';
  }

  getOrderList(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + 'order-list');
  }
  createOrder(order: Order) {
    return this.http.post<Order>(this.baseUrl + 'save-order', order);
  }
  deleteOrder(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'delete-order/' + id, {responseType: 'text'});
  }
  getOrder(id: number): Observable<Object> {
    return this.http.get(this.baseUrl + 'order/' + id);
  }
  updateOrder(id: number, value: any):Observable<Object> {
    return this.http.post(this.baseUrl + 'update-order/' + id, value);
  }

}
