import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl: NavController) {}

  unidad_medida(){
    this.navCtrl.navigateRoot('/unidad-medida');
   // this.navCtrl.navigateForward('/unidad-medida');
  }
  items(){
    this.navCtrl.navigateRoot('/item');
  }
  dev(){
    this.navCtrl.navigateRoot('/developers');
  }
  Almacen(){
    this.navCtrl.navigateRoot('/almacenes');
  }
  Stock(){
    this.navCtrl.navigateRoot('/stock');
  }
  Logout(){
    this.navCtrl.navigateRoot('/login');
  }
}
