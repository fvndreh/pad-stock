import { DatabaseService, Item, Dev, Unidad_Medida, Almacenes} from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {
  developers: Dev[] = [];
  ItemM: Item[] = [];
  item = {};
  ALMACENES_: Almacenes[] = [];
  Almacenes = {};
  unidades: Unidad_Medida[] = [];
  selectedView = 'devs';
  constructor(private db: DatabaseService, private navCtrl: NavController) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getItem().subscribe(i => {
          this.ItemM = i;
        });
        this.db.getUnidadMedida().subscribe(i => {
          this.unidades = i;
        });
        this.db.getAlmacenes().subscribe(alm => {
          this.ALMACENES_ = alm;
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

}
