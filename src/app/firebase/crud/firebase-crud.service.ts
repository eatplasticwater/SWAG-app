import { Injectable } from '@angular/core';

import { Firestore, collection, collectionData, query, CollectionReference, orderBy, startAt, endAt } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCrudService {

  constructor(private firestore: Firestore) {}

  // * Firebase User Listing Page
  public getListingData(): Observable<Array<any>> {
    const rawData: Observable<Array<any>> = collectionData<any>(
      query<any>(
        collection(this.firestore, 'users') as CollectionReference<any>
      ), { idField: 'id' }
    )
    .pipe(
      map((users: Array<any>) => {
        return users.map((user: any) => {
          const age = this.calcUserAge(user.birthdate);

          return { age, ...user };
        });
      })
    );

    return rawData;
  }

  // * Filter users by age
  public searchUsersByAge(lower: number, upper: number): Observable<Array<any>> {
    // ? We save the dateOfBirth in our DB so we need to calc the min and max dates valid for this query
    const minDate = (dayjs(Date.now()).subtract(upper, 'year')).unix();
    const maxDate =  (dayjs(Date.now()).subtract(lower, 'year')).unix();

    const filteredData: Observable<Array<any>> = collectionData<any>(
      query<any>(
        collection(this.firestore, 'users') as CollectionReference<any>,
        orderBy('birthdate'),
        startAt(minDate),
        endAt(maxDate)
      ), { idField: 'id' }
    )
    .pipe(
      map((users: Array<any>) => {
        return users.map((user: any) => {
          const age = this.calcUserAge(user.birthdate);

          return { age, ...user };
        });
      })
    );

    return filteredData;
  }

  private calcUserAge(dateOfBirth: number): number {
    return dayjs(Date.now()).diff(dayjs.unix(dateOfBirth), 'year');
  }
}
