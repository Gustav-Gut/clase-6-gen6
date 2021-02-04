import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private angularFireAuth: AngularFireAuth
  ) { }

  async login(email: string, pass: string){
    try {
      const respAuth = await this.angularFireAuth.auth.signInWithEmailAndPassword(email, pass);
      console.log('respuesta Auth-->', respAuth);
      return respAuth;
    } catch (error) {
      console.error('error auth -->', error);
    }
  }
}
