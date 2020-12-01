import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlmacenesDetallePageRoutingModule } from './almacenes-detalle-routing.module';

import { AlmacenesDetallePage } from './almacenes-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlmacenesDetallePageRoutingModule
  ],
  declarations: [AlmacenesDetallePage]
})
export class AlmacenesDetallePageModule {}
