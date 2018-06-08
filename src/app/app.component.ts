import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { UserProvider } from '../providers/user/user';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any //= TabsPage;

  constructor(platform: Platform, public userProvider: UserProvider, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.userProvider.isConnect().subscribe(state=>{
      console.log(state);
      if(state){
        this.userProvider.setUser().then(()=>{
          this.rootPage = TabsPage;
        });
      }else{
        this.rootPage = LoginPage;
      }
    });

  }
}