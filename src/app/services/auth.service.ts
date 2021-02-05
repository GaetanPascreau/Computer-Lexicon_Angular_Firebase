import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth }  from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authFire: AngularFireAuth) { }

  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        this.authFire.createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        this.authFire.signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser(){
    this.authFire.signOut();
  }
}