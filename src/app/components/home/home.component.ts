import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { FirebaseService } from '../../services/firebase.service';
import { FirestoreService } from '../../services/firestore.service';
import { Subject } from "rxjs"
import { takeUntil } from "rxjs/operators"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public myUser: User = {
    email: '',
    phoneNumber: '',
    profile: '',
    name: '',
    uid: ''
  };
  public uid: string;
  private serviceSuscription: Subject<boolean> = new Subject();

  constructor(
    private firebaseS: FirebaseService,
    private firestoreService: FirestoreService
  ) {
    this.firebaseS.currentUSer().then(async resp => {
      console.log('usuario actual -->', resp);
      this.uid = resp.uid;
    }).catch(error => {
      console.log('error calbackhell -->', error);
    })
  }

  async ngOnInit() {
    this.firestoreService.getUser(this.uid)
      .pipe(takeUntil(this.serviceSuscription))
      .subscribe(data => {
        console.log('firestore data home -->', data);
        this.myUser = {
          email: data.email,
          phoneNumber: data.phoneNumber,
          profile: data.profile,
          name: data.name,
          uid: data.uid
        };
        console.log('myuser data -->', this.myUser);
      });
    console.log('localstorage email -->', localStorage.getItem('email'));

  }

  ngOnDestroy() {
    console.log('servicio desuscrito -->', this.serviceSuscription);
    this.serviceSuscription.next(false);
    this.serviceSuscription.complete();
  }

}
