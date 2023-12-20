import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable, ReplaySubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { FirebaseCrudService } from '../firebase-crud.service';


@Component({
  selector: 'app-firebase-listing',
  templateUrl: './firebase-listing.page.html',
  styleUrls: [
    './styles/firebase-listing.page.scss',
    './styles/firebase-listing.ios.scss',
    './styles/firebase-listing.shell.scss'
  ],
})
export class FirebaseListingPage implements OnInit {
  rangeForm: UntypedFormGroup;
  searchQuery: string;
  showAgeFilter = false;

  searchSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  searchFiltersObservable: Observable<any> = this.searchSubject.asObservable();
  items: Array<any>;


  constructor(
    public firebaseCrudService: FirebaseCrudService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.searchQuery = '';

    this.rangeForm = new UntypedFormGroup({
      dual: new UntypedFormControl({lower: 1, upper: 100})
    });

    this.route.data.subscribe((resolvedRouteData) => {
      this.items = resolvedRouteData['data'];

      // We need to avoid having multiple firebase subscriptions open at the same time to avoid memory leaks
      // By using a switchMap to cancel previous subscription each time a new one arrives,
      // we ensure having just one subscription (the latest)
      this.searchFiltersObservable.pipe(
        switchMap((filters) => {
          return this.firebaseCrudService.searchUsersByAge(
            filters.lower,
            filters.upper
          ).pipe(
            map(filteredItems => {
              // Just filter items by name if there is a search query and they are not shell values
              if (filters.query !== '') {
                return filteredItems.filter(item => item.name.toLowerCase().includes(filters.query.toLowerCase()
                ));
              } else {
                return filteredItems;
              }
            })
          );
        })
      ).subscribe(items => {
        this.items = items;
      });
    },
      (error) => console.log(error)
    );
  }

  searchList() {
    this.searchSubject.next({
      lower: this.rangeForm.controls.dual.value.lower,
      upper: this.rangeForm.controls.dual.value.upper,
      query: this.searchQuery
    });
  }
}
