import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockAlmacenPage } from './stock-almacen.page';

const routes: Routes = [
  {
    path: '',
    component: StockAlmacenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockAlmacenPageRoutingModule {}
