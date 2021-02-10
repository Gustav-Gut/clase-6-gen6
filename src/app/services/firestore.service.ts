import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  public querySnapshot: any;

  constructor(
    private fireStore: AngularFirestore
  ) { }

  async createUser(newUser: User): Promise<string> {
    try {
      const respnewUser = await this.fireStore.collection('users').add(newUser);
      console.log('response createUser -->', respnewUser);
      return respnewUser.id;
    } catch (error) {
      console.log('error createUser -->', error);
    }
  }

  async getUser(uid: string): Promise<any> {
    this.querySnapshot = await this.fireStore.firestore.collection('users').where('uid', '==', uid).get();
    this.querySnapshot.forEach(async (resp: any): Promise<any> => {
      const dataQuery = await resp.data();
      console.log('data from bd -->', dataQuery);
      return dataQuery;
    })
  }
}
