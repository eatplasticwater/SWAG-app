import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Preferences } from '@capacitor/preferences';

@Injectable()
export class WalkthroughGuard  {
  constructor(private router: Router) {}

  async canActivate(): Promise<boolean> {
    const { value } = await Preferences.get({ key: 'visitedWalkthrough' });

    if (value === 'true') {
      // this is a returning user, don't show him the walkthrough
      this.router.navigate(['auth']);
      return false;
    } else {
      return true;
    }
  }
}
