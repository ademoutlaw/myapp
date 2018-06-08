import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { SingupPage } from '../singup/singup';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email:string;
  password:string;
  constructor(public navCtrl: NavController,public userProvider:UserProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(){
    this.userProvider.login(this.email, this.password)
    .then(user=>{
      console.log(user);
    }).catch(err=>{
      console.log(err);
    })
  }
  singup(){
    this.navCtrl.setRoot(SingupPage);
  }

}
