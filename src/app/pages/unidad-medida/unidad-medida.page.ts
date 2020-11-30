import { DatabaseService, Unidad_Medida, Dev } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-unidad-medida',
  templateUrl: './unidad-medida.page.html',
  styleUrls: ['./unidad-medida.page.scss'],
})
export class UnidadMedidaPage implements OnInit {

  developers: Dev[] = [];
  unidad_medida: Unidad_Medida[] = [];
  unidadMedida = {};

  selectedView = 'devs';

  constructor(private db: DatabaseService, private navCtrl: NavController) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getDevs().subscribe(devs => {
          this.developers = devs;
        })
        this.db.getUnidadMedida().subscribe(udms => {
          this.unidad_medida = udms;
        })
      }
    });
  }
 
  addUnidadM() {
 
    this.db.addUnidadM(this.unidadMedida['codigo'],this.unidadMedida['unidad_medida'], this.unidadMedida['descripcion'])
    .then(_ => {
      this.unidadMedida = {};
    });
  }
  mostrarDetalle(id){
    this.navCtrl.navigateForward('/unidad-detalle',id)
  }

}
