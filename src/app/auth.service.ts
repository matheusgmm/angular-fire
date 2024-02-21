import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  error: any;
  userInfo: any = [];

  constructor(public auth: AngularFireAuth) { }

  async emailSignIn(email: string, password: string) {
    try {
      const credential = await this.auth.signInWithEmailAndPassword(
        email,
        password
      );
      this.user = credential.user;
      console.log('User => ', this.user);
    } catch (error) {
      this.error = error;
      console.error('Erro => ', error);
    }
  }

  async googleSignIn() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.auth.signInWithPopup(provider);
      this.user = credential.user;
      this.userInfo.push(credential.user?.displayName);
      this.userInfo.push(credential.user?.photoURL);
      this.userInfo.push(credential.user?.providerId);
      this.userInfo.push(credential.user?.providerData);
      this.userInfo.push(credential.user?.metadata);
      this.userInfo.push(credential.user?.uid);
      this.userInfo.push(this.auth.credential);
      console.log('UserInfo => ', this.userInfo);
    } catch (error) {
        this.error = error;
        console.error('Erro => ', error);
    }
  }

  async signOut() {
    await this.auth.signOut();
    this.user = null;
  }
}
