import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { FirebaseService } from '../../services/firebase.service';
import { FirestoreService } from '../../services/firestore.service';
import { RutValidator } from 'ng9-rut';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public profiles: any[] = ['basic', 'medium', 'advanced'];

  get email() { return this.registerForm.get('email') };
  get pass() { return this.registerForm.get('pass') };
  get phones() { return this.registerForm.get('phones') as FormArray };

  public registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
    name: new FormControl(''),
    profile: new FormControl(''),
    phones: new FormArray([]),
    newsletter: new FormControl(false),
    rut: new FormControl('', [Validators.required])
  })

  constructor(
    private firebaseService: FirebaseService,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {
  }

  addPhone() {
    const phoneGroup = new FormGroup({
      phone: new FormControl(''),
      description: new FormControl('')
    });
    this.phones.push(phoneGroup);
  }

  removePhone(index: number) {
    this.phones.removeAt(index);
  }

  onRegister() {
    console.log('registerForm -->', this.registerForm.value);
    this.firebaseService.registerUser(this.registerForm.value.email, this.registerForm.value.pass).then(resp => {
      console.log('ok register authenticate firebase');
      const newUSer: User = {
        email: resp.email,
        name: this.registerForm.value.name,
        phoneNumber: this.registerForm.value.phones,
        profile: this.registerForm.value.profile,
        newsletter: this.registerForm.value.newsletter,
        uid: resp.uid,
      }
      this.firestoreService.createUser(newUSer).then(resp => {
        console.log('new user register firestore -->', resp);
      }).catch(error => {
        console.log('error register firestore -->', error);
      })
    })
  }

}
