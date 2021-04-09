import { Component, OnInit } from '@angular/core';
import { OrderService } from "../order.service";
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Order } from "../order";

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  constructor(private orderService:OrderService) { }

  order : Order = new Order();
  submitted = false;

  ngOnInit() {
    this.submitted = false;
  }

  ordersaveform = new FormGroup({
    client:new FormControl('', [Validators.required, Validators.minLength(2)]),
    creationDate:new FormControl(),
    address:new FormControl('', Validators.required)
  });

  saveOrder(saveOrder: object){
    this.order=new Order();
    this.order.client=this.OrderClient!.value;
    this.order.creationDate=this.OrderDate!.value;
    this.order.address=this.OrderAddress!.value;
    this.submitted = true;
    this.save();
  }

  save() {
    this.orderService.createOrder(this.order)
      .subscribe(data =>console.log(data), error => console.log(error));
    this.order = new Order();
  }

  get OrderClient() {
    return this.ordersaveform.get('client');
  }
  get OrderDate() {
    return this.ordersaveform.get('creationDate');
  }
  get OrderAddress() {
    return this.ordersaveform.get('address');
  }

  addOrderForm() {
    this.submitted=false;
    this.ordersaveform.reset();
  }

}


