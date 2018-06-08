import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user.interface';
import { AngularFireDatabase } from 'angularfire2/database';


/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  user = {} as User;
  constructor(public auth: AngularFireAuth, public db : AngularFireDatabase) {
    console.log('Hello UserProvider Provider');
  }
  isConnect(){
    return this.auth.authState;
  }
  login(email:string, password:string):Promise<any>{
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }
  setUser(){
    return new Promise((resolve, reject)=>{
      const uid = this.auth.auth.currentUser.uid;
      this.db.object(`users/${uid}`).valueChanges().subscribe((user:any)=>{
        if(user){
          this.user = user;
          this.user.uid = uid;
        }else{
          this.user = {
            uid,
            email:this.auth.auth.currentUser.email,
            firstName:"",
            lastName:""
          }
        }
        resolve();
      });
    });
    
  }
  logOut(){
    this.auth.auth.signOut();
  }
  getCurrentUser(){
    return this.user;
  }

}
