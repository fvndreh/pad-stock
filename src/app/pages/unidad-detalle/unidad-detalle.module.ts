import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnidadDetallePageRoutingModule } from './unidad-detalle-routing.module';

import { UnidadDetallePage } from './unidad-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnidadDetallePageRoutingModule
  ],
  declarations: [UnidadDetallePage]
})
export class UnidadDetallePageModule {}
