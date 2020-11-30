import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnidadMedidaPage } from './unidad-medida.page';

const routes: Routes = [
  {
    path: '',
    component: UnidadMedidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnidadMedidaPageRoutingModule {}
