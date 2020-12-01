import { DatabaseService, Item, Dev, Unidad_Medida} from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})

export class ItemPage implements OnInit {
  developers: Dev[] = [];
  ItemM: Item[] = [];
  item = {};
  selectedView = 'devs';
  unidades: Unidad_Medida[] = [];
  constructor(private db: DatabaseService, private navCtrl: NavController) {
   }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getItem().subscribe(i => {
          this.ItemM = i;
        });
        this.db.getUnidadMedida().subscribe(i => {
          this.unidades = i;
        });
      }
    });
  }
  addItem() {
    // tslint:disable-next-line: no-string-literal
    this.db.addItem(this.item['codigo'], this.item['descripcion'], this.item['unidad_medida'])
    .then(_ => {
      this.item = {};
    });
  }
  // mostrarDetalle(id){
  //   this.navCtrl.navigateForward('/item-detalle', id);
  // }
}
