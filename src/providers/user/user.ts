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
  singup(user:User, password){
    return new Promise((resolve, reject)=>{
      this.auth.auth.createUserWithEmailAndPassword(user.email, password)
      .then(()=>{
        this.db.list('users').update(this.auth.auth.currentUser.uid,user)
          .then(()=>resolve())
          .catch(err=>{
            reject(err);
          });
      })
      .catch(err=>{
        reject(err);
      });
    })
  }
  getAllUsers(){
    return this.db.list('users').snapshotChanges().map(actions=>{
      console.log(actions);
      return actions.map(action=>{
        const data = action.payload.val();
        data.uid = action.payload.key;
        return data;
      });
    });
  }
  getFriends(){
    return this.db.list(`friends/${this.user.uid}`).snapshotChanges().map(actions=>{
      console.log(actions);
      return actions.map(action=>{
        const data = action.payload.val();
        data.uid = action.payload.key;
        return data;
      });
    });
  }
  addFriend(friend:User){
    return this.db.list(`friends/${this.user.uid}`)
    .update(friend.uid,{firstName:friend.firstName, lastName:friend.lastName});
  }
  removeFriend(friend){
    return this.db.list(`friends/${this.user.uid}/${friend.uid}`).remove();

  }

}
