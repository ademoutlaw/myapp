import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { User } from '../../models/user.interface';
import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the SinginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-singup',
  templateUrl: 'singup.html',
})
export class SingupPage {
  user = {} as User;
  password : string;
  constructor(public navCtrl: NavController,
    public userProvider:UserProvider, 
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SinginPage');
  }
  singup(){
    console.log(this.user);
    const load = this.loadCtrl.create();
    load.present();
    this.userProvider.singup(this.user, this.password).then(()=>{
      load.dismiss();
    }).catch(err=>{
      load.dismiss();
      this.alertCtrl.create({
        title: 'err!!!',
        message: err,
        buttons: ['OK']
      }).present();
    })

  }
  login(){
    this.navCtrl.setRoot(LoginPage);
  }

}
