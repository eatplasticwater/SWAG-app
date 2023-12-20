import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { Capacitor } from '@capacitor/core';

import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth, initializeAuth, indexedDBLocalPersistence } from '@angular/fire/auth';

import { ComponentsModule } from '../../components/components.module';
import { environment } from '../../../environments/environment';
import { FirebaseAuthService } from './firebase-auth.service';
import { FirebaseAuthHelper } from './firebase-auth.helper';


const routes: Routes = [
  {
    path: '',
    children: [
      // ? /firebase/auth redirect
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full',
      },
      {
        path: 'sign-in',
        loadChildren: () => import('./sign-in/firebase-sign-in.module').then(m => m.FirebaseSignInPageModule)
      },
      {
        path: 'sign-up',
        loadChildren: () => import('./sign-up/firebase-sign-up.module').then(m => m.FirebaseSignUpPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/firebase-profile.module').then(m => m.FirebaseProfilePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    // ? Correct way to initialize Firebase using the Capacitor Firebase plugin mixed with the Firebase JS SDK (@angular/fire)
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      if (Capacitor.isNativePlatform()) {
        return initializeAuth(getApp(), {
          persistence: indexedDBLocalPersistence
          // persistence: browserLocalPersistence
          // popupRedirectResolver: browserPopupRedirectResolver
        });
      } else {
        return getAuth();
      }
    })
  ],
  providers: [
    FirebaseAuthService,
    FirebaseAuthHelper
  ]
})
export class FirebaseAuthModule {}
