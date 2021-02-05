import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private firebaseS: FirebaseService
  ) { }

  ngOnInit() {
    this.firebaseS.currentUSer().then(resp => {
      console.log('usuario actual -->', resp);
    })
    console.log('localstorage email -->', localStorage.getItem('email'));
  }

}
