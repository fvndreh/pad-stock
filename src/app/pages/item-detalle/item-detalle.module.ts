import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemDetallePageRoutingModule } from './item-detalle-routing.module';

import { ItemDetallePage } from './item-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemDetallePageRoutingModule
  ],
  declarations: [ItemDetallePage]
})
export class ItemDetallePageModule {}
