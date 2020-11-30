import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockAlmacenPageRoutingModule } from './stock-almacen-routing.module';

import { StockAlmacenPage } from './stock-almacen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockAlmacenPageRoutingModule
  ],
  declarations: [StockAlmacenPage]
})
export class StockAlmacenPageModule {}
