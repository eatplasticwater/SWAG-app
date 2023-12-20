import { Component, NgZone } from '@angular/core';
import { Validators, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStateChange, SignInResult } from '@capacitor-firebase/authentication';

import { Subscription } from 'rxjs';

import { FirebaseAuthService } from '../firebase-auth.service';

@Component({
  selector: 'app-firebase-sign-in',
  templateUrl: './firebase-sign-in.page.html',
  styleUrls: [
    './styles/firebase-sign-in.page.scss'
  ]
})
export class FirebaseSignInPage {
  loginForm: UntypedFormGroup;
  submitError: string;
  authRedirectResult: Subscription;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ]
  };

  constructor(
    public router: Router,
    public firebaseAuthService: FirebaseAuthService,
    private ngZone: NgZone
  ) {
    this.loginForm = new UntypedFormGroup({
      'email': new UntypedFormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new UntypedFormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    });

    // ? Get firebase authentication redirect result invoked when using signInWithRedirect()
    // ? signInWithRedirect() is only used when client is in web but not desktop. For example a PWA
    this.authRedirectResult = this.firebaseAuthService.redirectResult$
    .subscribe(result => {
      if (result.error) {
        this.manageAuthWithProvidersErrors(result.error);
      } else {
        this.redirectLoggedUserToProfilePage();
      }
    });

    this.firebaseAuthService.authState$
    .subscribe((stateChange: AuthStateChange) => {
      if (!stateChange.user) {
        this.manageAuthWithProvidersErrors('No user logged in');
      } else {
        this.redirectLoggedUserToProfilePage();
      }
    });
  }

  public async doFacebookLogin(): Promise<void> {
    this.resetSubmitError();

    try {
      await this.firebaseAuthService.signInWithFacebook()
      .then((result: SignInResult) => {
        // ? This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // const token = result.credential.accessToken;
        this.redirectLoggedUserToProfilePage();
      })
      .catch((error) => {
        this.manageAuthWithProvidersErrors(error.message);
      });
    } finally {
      // ? Termination code goes here
    }
  }

  public async doGoogleLogin(): Promise<void> {
    this.resetSubmitError();

    try {
      await this.firebaseAuthService.signInWithGoogle()
      .then((result) => {
        // ? This gives you a Google Access Token. You can use it to access the Google API.
        // const token = result.credential.accessToken;
        this.redirectLoggedUserToProfilePage();
      })
      .catch((error) => {
        this.manageAuthWithProvidersErrors(error.message);
      });
    } finally {
      // ? Termination code goes here
    }
  }

  public async doTwitterLogin(): Promise<void> {
    this.resetSubmitError();

    try {
      await this.firebaseAuthService.signInWithTwitter()
      .then((result) => {
        // ? This gives you a Twitter Access Token. You can use it to access the Twitter API.
        // const token = result.credential.accessToken;
        this.redirectLoggedUserToProfilePage();
      })
      .catch((error) => {
        this.manageAuthWithProvidersErrors(error.message);
      });
    } finally {
      // ? Termination code goes here
    }
  }

  public async doAppleLogin(): Promise<void> {
    this.resetSubmitError();

    try {
      await this.firebaseAuthService.signInWithApple()
      .then((result) => {
        this.redirectLoggedUserToProfilePage();
      })
      .catch((error) => {
        this.manageAuthWithProvidersErrors(error.message);
      });
    } finally {
      // ? Termination code goes here
    }
  }

  public async signInWithEmail(): Promise<void> {
    this.resetSubmitError();

    try {
      await this.firebaseAuthService.signInWithEmail(this.loginForm.value['email'], this.loginForm.value['password'])
      .then((result) => {
        this.redirectLoggedUserToProfilePage();
      })
      .catch((error) => {
        this.submitError = error.message;
      });
    } finally {
      // ? Termination code goes here
    }
  }

  // ? Once the auth provider finished the authentication flow, and the auth redirect completes, hide the loader and redirect the user to the profile page
  private redirectLoggedUserToProfilePage(): void {
    // As we are calling the Angular router navigation inside a subscribe method, the navigation will be triggered outside Angular zone.
    // That's why we need to wrap the router navigation call inside an ngZone wrapper
    this.ngZone.run(() => {
      // Get previous URL from our custom History Helper
      // If there's no previous page, then redirect to profile
      // const previousUrl = this.historyHelper.previousUrl || 'firebase/auth/profile';
      const previousUrl = 'firebase/auth/profile';

      // No need to store in the navigation history the sign-in page with redirect params (it's just a a mandatory mid-step)
      // Navigate to profile and replace current url with profile
      this.router.navigate([previousUrl], { replaceUrl: true });
    });
  }

  private manageAuthWithProvidersErrors(errorMessage: string): void {
    this.submitError = errorMessage;
  }

  private resetSubmitError(): void {
    this.submitError = null;
  }
}
