import { DatabaseService, Almacenes } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-almacenes',
  templateUrl: './almacenes.page.html',
  styleUrls: ['./almacenes.page.scss'],
})
export class AlmacenesPage implements OnInit {
  ALMACENES_: Almacenes[] = [];
  Almacenes = {};

  selectedView = 'devs';
  constructor(private db: DatabaseService, private navCtrl: NavController) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getAlmacenes().subscribe(alm => {
          this.ALMACENES_ = alm;
        });
      }
    });
  }
  addAlmacen() {
    // tslint:disable-next-line: no-string-literal
    this.db.addAlmacen(this.Almacenes['codigo'] , this.Almacenes['descripcion'])
    .then(_ => {
      this.Almacenes = {};
    });
  }

}
