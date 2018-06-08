import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Observable } from "rxjs";
import { User } from '../../models/user.interface';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  users:Observable<User[]>
  me={} as User;
  constructor(public navCtrl: NavController, public userProvider:UserProvider) {

  }
  ionViewDidLoad(){
    this.me = this.userProvider.getCurrentUser();
    this.users = this.userProvider.getAllUsers();
  }
  addFriend(friend){
    this.userProvider.addFriend(friend);
  }

}
