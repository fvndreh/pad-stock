import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlmacenesDetallePage } from './almacenes-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: AlmacenesDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlmacenesDetallePageRoutingModule {}
