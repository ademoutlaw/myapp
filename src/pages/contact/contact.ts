import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from "rxjs";
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user.interface';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  friends:Observable<User[]>
  me={} as User;
  constructor(public navCtrl: NavController, public userProvider:UserProvider) {

  }
  ionViewDidLoad(){
    this.me = this.userProvider.getCurrentUser();
    this.friends = this.userProvider.getFriends();
  }
  removeFriend(friend){
    this.userProvider.removeFriend(friend);
  }

}
