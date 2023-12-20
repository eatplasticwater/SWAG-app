import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FirebaseAuthService } from '../firebase-auth.service';

@Component({
  selector: 'app-firebase-profile',
  templateUrl: './firebase-profile.page.html',
  styleUrls: [
    './styles/firebase-profile.page.scss',
    './styles/firebase-profile.shell.scss'
  ]
})
export class FirebaseProfilePage implements OnInit {
  user: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: FirebaseAuthService
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      this.user = routeData['data'];
    });
  }

  public async signOut(): Promise<void> {
    try {
      // * 1. Sign out on the native layer
      await this.authService.signOut()
      .then((result) => {
        // ? Sign-out successful
        // ? Replace state as we are no longer authorized to access profile page
        this.router.navigate(['firebase/auth/sign-in'], { replaceUrl: true });
      })
      .catch((error) => {
        console.log('userProfile - signOut() - error', error);
      });
    } finally {
      console.log('userProfile - signOut() - finally');
    }
  }
}
