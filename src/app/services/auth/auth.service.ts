import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { mergeMap, Observable, tap } from 'rxjs';
import { Account } from './account';
import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private firebaseUser:firebase.User | null = null;
  constructor(private fireAuth:AngularFireAuth) { 

  
  }

  private async getAccountInfo(user:firebase.User):Promise<any>{
    return undefined;
  }

  get
  $account():Observable<Account | undefined>{
    return this.fireAuth.authState.pipe(
      tap((user)=>{
        this.firebaseUser = user;
      }),
      mergeMap(async (user:firebase.User | null) => {
        if(user){
          const info = await this.getAccountInfo(user);
          return {
            uid:user.uid,
            info
          }
        }
        else{
          return undefined;
        }
      })
    )
  }

  async loginWithGoogle():Promise<boolean>{
    try {
      this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      return true;
    }
    catch(e){
      return false;
    }
  }

  logout(){
    this.fireAuth.signOut();
  }

  async getToken():Promise<string | undefined>{
    if(this.firebaseUser)
      return this.firebaseUser.getIdToken();
    else
      return undefined;
  }
}
