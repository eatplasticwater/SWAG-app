import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { redirectUnauthorizedTo, canActivate, AuthPipe } from '@angular/fire/auth-guard';

import { ComponentsModule } from '../../../components/components.module';
import { FirebaseProfilePage } from './firebase-profile.page';
import { FirebaseProfileResolver } from './firebase-profile.resolver';


const redirectUnauthorizedToLogin: () => AuthPipe = () => redirectUnauthorizedTo(['/firebase/auth/sign-in']);

const routes: Routes = [
  {
    path: '',
    component: FirebaseProfilePage,
    resolve: {
      data: FirebaseProfileResolver
    },
    ...canActivate(redirectUnauthorizedToLogin)
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [
    FirebaseProfilePage
  ],
  providers: [
    FirebaseProfileResolver
  ]
})
export class FirebaseProfilePageModule {}
