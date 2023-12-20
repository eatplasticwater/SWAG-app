import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { take } from 'rxjs/operators';
import { FirebaseAuthService } from '../firebase-auth.service';

@Injectable()
export class FirebaseProfileResolver implements Resolve<any> {

  constructor(private firebaseAuthService: FirebaseAuthService) {}

  resolve() {
    return this.firebaseAuthService.getProfileData()
    .pipe(
      take(1)
    );
  }
}
