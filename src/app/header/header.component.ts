import { Component, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth }  from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean = false;
  
  constructor(private authService: AuthService, private authFire: AngularFireAuth) { }

  ngOnInit(): void {
    this.authFire.onAuthStateChanged(
      (user) => {
        if(user){
          this.isAuth = true;
        }else{
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut(){
    this.authService.signOutUser();
  }

}