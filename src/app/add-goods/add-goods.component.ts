import { Component, OnInit } from '@angular/core';
import { GoodsService } from "../goods.service";
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Goods } from "../goods";

@Component({
  selector: 'app-add-goods',
  templateUrl: './add-goods.component.html',
  styleUrls: ['./add-goods.component.css']
})
export class AddGoodsComponent implements OnInit {

  constructor(private goodsService:GoodsService) { }
  goods: Goods = new Goods();
  submitted = false;

  ngOnInit(): void {
    this.submitted = false;
  }

  goodssaveform = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    price: new FormControl('', [Validators.required])
  });

  saveGoods(saveGoods: object){
    this.goods = new Goods();
    this.goods.name = this.GoodsName!.value;
    this.goods.price = this.GoodsPrice!.value;
    this.submitted = true;
    this.save();
  }

  save() {
    this.goodsService.createGoods(this.goods)
      .subscribe(data => console.log(data), error => console.log(error));
    this.goods = new Goods();
  }

  get GoodsName() {
    return this.goodssaveform.get('name');
  }
  get GoodsPrice() {
    return this.goodssaveform.get('price');
  }

  addGoodsForm() {
    this.submitted = false;
    this.goodssaveform.reset();
  }
}
