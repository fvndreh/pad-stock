import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService, Almacenes } from './../../services/database.service';
import { ToastController } from '@ionic/angular';
import { constants } from 'buffer';

@Component({
  selector: 'app-almacenes-detalle',
  templateUrl: './almacenes-detalle.page.html',
  styleUrls: ['./almacenes-detalle.page.scss'],
})
export class AlmacenesDetallePage implements OnInit {
  Almacen: Almacenes = null;

  constructor(private route: ActivatedRoute, private db: DatabaseService, private router: Router, private toast: ToastController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const AlmId = params.get('id');

      this.db.getAlmacen(AlmId).then(data => {
        this.Almacen = data;
      });
    });
  }
  deleteAlmacen() {
    this.db.deleteAlmacen(this.Almacen.id).then(() => {
      this.router.navigateByUrl('/almacenes');
    });
  }

  updateAlmacen() {

    this.db.updateAlmacen(this.Almacen).then(async (res) => {
      this.router.navigateByUrl('/almacenes');
      const toast = await this.toast.create({
        message: 'Almacen Actualizado!',
        duration: 3000
      });
      toast.present();
    });
  }

}
