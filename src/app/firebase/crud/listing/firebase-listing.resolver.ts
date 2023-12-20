import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { take } from 'rxjs/operators';
import { FirebaseCrudService } from '../firebase-crud.service';

@Injectable()
export class FirebaseListingResolver implements Resolve<any> {

  constructor(private firebaseCrudService: FirebaseCrudService) {}

  resolve() {
    return this.firebaseCrudService.getListingData()
    .pipe(
      take(1)
    );
  }
}
