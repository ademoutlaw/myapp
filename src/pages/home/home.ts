import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { User } from '../../models/user.interface';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user={}as User;
  constructor(public navCtrl: NavController, public userProvider: UserProvider) {

    this.user = this.userProvider.getCurrentUser();
    console.log(this.user);
  }
  update(){
    console.log(this.user);
  }
  logout(){
    this.userProvider.logOut();
  }
}
