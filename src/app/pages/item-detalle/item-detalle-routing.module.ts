import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemDetallePage } from './item-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: ItemDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemDetallePageRoutingModule {}
