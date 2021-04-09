import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from "./order-list/order-list.component";
import { AddOrderComponent } from "./add-order/add-order.component";
import { GoodsListComponent } from "./goods-list/goods-list.component";
import { AddGoodsComponent} from "./add-goods/add-goods.component";

const routes: Routes = [
  { path:'', redirectTo: 'view-order', pathMatch: 'full' },
  { path: 'view-order', component: OrderListComponent },
  { path: 'add-order', component: AddOrderComponent },
  { path: 'view-goods', component: GoodsListComponent },
  { path: 'add-goods', component: AddGoodsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
