import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { NgForm} from '@angular/forms';
import { DatabaseService, User, Dev } from './../../services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  users: User[] = [];
  public theTodo: any;

  selectedView = 'devs';
  errorMessage = ''
 
  constructor(private db: DatabaseService, private navCtrl: NavController) {
   }

  ngOnInit() {
  }

  login(form: NgForm) {
    const { username, password } = form.value;
    this.db.getUser(username,password).then(data => {

      if(data){
        this.navCtrl.navigateForward('/home');
      }else{
        this.theTodo = 'Something went wrong!' ;
      }
  }).catch( err => {
    this.errorMessage = 'usuario o clave incorrectas'
  }) 
  }

}
