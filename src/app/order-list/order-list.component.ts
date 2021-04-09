import { Component, OnInit } from '@angular/core';
import { OrderService } from "../order.service";
import { Order } from "../order";
import { Observable,Subject } from "rxjs";

import { FormControl,FormGroup,Validators } from "@angular/forms";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(private orderservice:OrderService) { }

  orderArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  orders: Order[];
  order: Order=new Order();
  deleteMessage=false;
  orderlist:any;
  isupdated=false;

  ngOnInit() {
    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave: true,
      lengthMenu:[[6, 16, 20,-1], [6, 16, 20, "All"]],
      processing:true
    };
    this.orderservice.getOrderList().subscribe(data =>{
      this.orders = data;
      this.dtTrigger.next();
    })
  }

  deleteOrder(id: number) {
    this.orderservice.deleteOrder(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage=true;
          this.orderservice.getOrderList().subscribe(data => {
            this.orders = data
          })
        },
        error => console.log(error)
      );
  }

  updateOrder(id: number) {
    this.orderservice.getOrder(id)
      .subscribe(
        data => {
          this.orderlist = data
        },
        error => console.log(error)
      );
  }

  orderupdateform=new FormGroup({
    id:new FormControl(),
    client:new FormControl(),
    creationDate:new FormControl(),
    address:new FormControl()
  });

  updateOrd(updateord){
    this.order=new Order();
    this.order.id=this.OrderId.value;
    this.order.client=this.OrderClient.value;
    this.order.creationDate=this.OrderDate.value;
    this.order.address=this.OrderAddress.value;

    this.orderservice.updateOrder(this.order.id, this.order).subscribe(
      data => {
        this.isupdated=true;
        this.orderservice.getOrderList().subscribe(data => {
          this.orders=data
        })
      },
      error => console.log(error)
    );
  }

  get OrderClient() {
    return this.orderupdateform.get('client');
  }
  get OrderDate() {
    return this.orderupdateform.get('creationDate');
  }
  get OrderAddress() {
    return this.orderupdateform.get('address');
  }
  get OrderId() {
    return this.orderupdateform.get('id');
  }

  changeisUpdate() {
    this.isupdated = false;
  }

}
