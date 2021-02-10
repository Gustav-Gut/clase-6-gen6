import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { FirebaseService } from '../../services/firebase.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public myUser: User;
  public uid: string;

  constructor(
    private firebaseS: FirebaseService,
    private firestoreService: FirestoreService
  ) {
    this.firebaseS.currentUSer().then(async resp => {
      console.log('usuario actual -->', resp);
      this.uid = resp.uid;
      const userActive = await this.firestoreService.getUser(this.uid);
      console.log('resp from currentUSer home -->', userActive);
      // this.firestoreService.getUser(resp.uid).then(resp => {
      //   console.log('resp from currentUSer home -->', resp);
      // }).catch(error => {
      //   console.log('error from currentUser home -->', error);
      // })
    }).catch(error => {
      console.log('error calbackhell -->', error);
    })
  }

  ngOnInit() {

    console.log('localstorage email -->', localStorage.getItem('email'));

  }

}
