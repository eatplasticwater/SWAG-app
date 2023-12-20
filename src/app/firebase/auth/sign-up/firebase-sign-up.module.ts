import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { map } from 'rxjs/operators';

import { canActivate, AuthPipeGenerator } from '@angular/fire/auth-guard';

import { FirebaseSignUpPage } from './firebase-sign-up.page';
import { ComponentsModule } from '../../../components/components.module';


// ? Firebase guard to redirect logged in users to profile
const redirectLoggedInToProfile: AuthPipeGenerator = (next) => map(user => {
  // ? When queryParams['auth-redirect'] don't redirect because we want the component to handle the redirection
  if (user !== null && !next.queryParams['auth-redirect']) {
    return ['firebase/auth/profile'];
  } else {
    return true;
  }
});

const routes: Routes = [
  {
    path: '',
    component: FirebaseSignUpPage,
    ...canActivate(redirectLoggedInToProfile)
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
  declarations: [FirebaseSignUpPage]
})
export class FirebaseSignUpPageModule {}
