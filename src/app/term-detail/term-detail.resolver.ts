import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class TermDetailResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let termId = route.paramMap.get('id');
      this.firebaseService.getTerm(termId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}