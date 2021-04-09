import { Component, OnInit } from '@angular/core';
import { GoodsService } from "../goods.service";
import { Goods } from "../goods";
import { Observable,Subject } from "rxjs";
import { FormControl,FormGroup,Validators } from "@angular/forms";

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.css']
})
export class GoodsListComponent implements OnInit {

  constructor(private goodsservice:GoodsService) { }

  goodsArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  good: Goods[];
  goods: Goods=new Goods();
  deleteMessage=false;
  goodslist:any;
  isupdated=false;

  ngOnInit() {
    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave: true,
      lengthMenu:[[6, 16, 20,-1], [6, 16, 20, "All"]],
      processing:true
    };
    this.goodsservice.getGoodsList().subscribe(data =>{
      this.good = data;
      this.dtTrigger.next();
    })
  }

  deleteGoods(id: number) {
    this.goodsservice.deleteGoods(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage=true;
          this.goodsservice.getGoodsList().subscribe(data => {
            this.good = data
          })
        },
        error => console.log(error)
      );
  }

  updateGoods(id: number) {
    this.goodsservice.getGoods(id)
      .subscribe(
        data => {
          this.goodslist = data
        },
        error => console.log(error)
      );
  }

  goodsupdateform=new FormGroup({
    id:new FormControl(),
    name:new FormControl(),
    price:new FormControl()
  });

  updateG(updateg){
    this.goods=new Goods();
    this.goods.id=this.GoodsId.value;
    this.goods.name=this.GoodsName.value;
    this.goods.price=this.GoodsPrice.value;

    this.goodsservice.updateGoods(this.goods.id, this.goods).subscribe(
      data => {
        this.isupdated=true;
        this.goodsservice.getGoodsList().subscribe(data => {
          this.good=data
        })
      },
      error => console.log(error)
    );
  }

  get GoodsName() {
    return this.goodsupdateform.get('name');
  }
  get GoodsPrice() {
    return this.goodsupdateform.get('price');
  }
  get GoodsId() {
    return this.goodsupdateform.get('id');
  }

  changeisUpdate() {
    this.isupdated = false;
  }

}
