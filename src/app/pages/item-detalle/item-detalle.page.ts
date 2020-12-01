import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService, Dev, Unidad_Medida, Item } from './../../services/database.service';
import { ToastController } from '@ionic/angular';
import { constants } from 'buffer';

@Component({
  selector: 'app-item-detalle',
  templateUrl: './item-detalle.page.html',
  styleUrls: ['./item-detalle.page.scss'],
})
export class ItemDetallePage implements OnInit {

  itemM: Item = null;

  constructor(private route: ActivatedRoute, private db: DatabaseService, private router: Router, private toast: ToastController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const itemId = params.get('id');

      this.db.getItemM(itemId).then(data => {
        this.itemM = data;
      });
    });
  }
  deleteItem() {
    this.db.deleteItem(this.itemM.id).then(() => {
      this.router.navigateByUrl('/item');
    });
  }
  updateItem() {

    this.db.updateItem(this.itemM).then(async (res) => {
      this.router.navigateByUrl('/item');
      const toast = await this.toast.create({
        message: 'Item Actualizado',
        duration: 3000
      });
      toast.present();
    });
  }

}
