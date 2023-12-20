import { Component, OnInit, NgZone } from '@angular/core';
import { Validators, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { AuthStateChange, SignInResult } from '@capacitor-firebase/authentication';

import { Subscription } from 'rxjs';

import { PasswordValidator } from '../../../validators/password.validator';
import { FirebaseAuthService } from '../firebase-auth.service';

@Component({
  selector: 'app-firebase-sign-up',
  templateUrl: './firebase-sign-up.page.html',
  styleUrls: [
    './styles/firebase-sign-up.page.scss'
  ]
})
export class FirebaseSignUpPage implements OnInit {
  signupForm: UntypedFormGroup;
  matching_passwords_group: UntypedFormGroup;
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
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' }
    ],
    'matching_passwords': [
      { type: 'areNotEqual', message: 'Password mismatch' }
    ]
  };

  constructor(
    public menu: MenuController,
    public router: Router,
    public firebaseAuthService: FirebaseAuthService,
    private ngZone: NgZone
  ) {
    this.matching_passwords_group = new UntypedFormGroup({
      'password': new UntypedFormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      'confirm_password': new UntypedFormControl('', Validators.required)
    }, (formGroup: UntypedFormGroup) => {
      return PasswordValidator.areNotEqual(formGroup);
    });

    this.signupForm = new UntypedFormGroup({
      'email': new UntypedFormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'matching_passwords': this.matching_passwords_group
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

  ngOnInit(): void {
    this.menu.enable(false);
  }

  public async doFacebookSignup(): Promise<void> {
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

  public async doGoogleSignup(): Promise<void> {
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

  public async doTwitterSignup(): Promise<void> {
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

  public async doAppleSignup(): Promise<void> {
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

  public async signUpWithEmail(): Promise<void> {
    this.resetSubmitError();

    try {
      await this.firebaseAuthService.signUpWithEmail(this.signupForm.value['email'], this.signupForm.value.matching_passwords.password)
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

      // No need to store in the navigation history the sign-in page with redirect params (it's justa a mandatory mid-step)
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
