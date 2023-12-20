import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { environment } from '../../../environments/environment';

const firebaseRoutes: Routes = [
  {
    path: '',
    children: [
      // /firebase/crud redirect
      {
        path: '',
        redirectTo: 'listing',
        pathMatch: 'full',
      },
      {
        path: 'listing',
        loadChildren: () => import('./../crud/listing/firebase-listing.module').then(m => m.FirebaseListingPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(firebaseRoutes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ]
})
export class FirebaseCrudModule {}
