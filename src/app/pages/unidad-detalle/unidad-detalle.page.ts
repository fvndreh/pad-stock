import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService, Dev, Unidad_Medida } from './../../services/database.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-unidad-detalle',
  templateUrl: './unidad-detalle.page.html',
  styleUrls: ['./unidad-detalle.page.scss'],
})
export class UnidadDetallePage implements OnInit {

  unidadM  : Unidad_Medida = null;

  constructor(private route: ActivatedRoute, private db: DatabaseService, private router: Router, private toast: ToastController) { }
 
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let uniId = params.get('id');
 
      this.db.getUnidadM(uniId).then(data => {
        this.unidadM = data;
      }); 
    });
  }

  deleteUnidadM() {
    this.db.deleteUnidadM(this.unidadM.id).then(() => {
      this.router.navigateByUrl('/unidad-medida');
    });
  }

  updateUnidadM() {
 
    this.db.updateUnidadM(this.unidadM).then(async (res) => {
      this.router.navigateByUrl('/unidad-medida');
      let toast = await this.toast.create({
        message: 'Unidad Medida Actualizado',
        duration: 3000
      });
      toast.present();
    });
  }

}
