import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  public loginForm = new FormGroup({
    email: new FormControl(''),
    pass: new FormControl('')
  })

  constructor(
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
  }

  onLogin(){
    console.log('submit -->', this.loginForm.value);
    this.firebaseService.login(this.loginForm.value.email, this.loginForm.value.pass).then(resp => {
      console.log('response login -->', resp);
    }).catch(error => {
      console.error('error login -->', error);
    })
  }

}
