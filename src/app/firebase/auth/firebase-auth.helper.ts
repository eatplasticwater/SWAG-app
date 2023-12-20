import { Injectable } from '@angular/core';

import { FacebookAuthProvider, getAdditionalUserInfo, GoogleAuthProvider, OAuthProvider, TwitterAuthProvider } from '@angular/fire/auth';
import {
  AuthCredential as FirebaseAuthCredential,
  AuthProvider as FirebaseAuthProvider,
  CustomParameters as FirebaseCustomParameters,
  OAuthCredential,
  User as FirebaseUser,
  UserCredential as FirebaseUserCredential
} from '@angular/fire/auth';

import { AuthCredential, SignInResult, User, AdditionalUserInfo, SignInOptions } from '@capacitor-firebase/authentication';


// * Aux methods inspired on the @capacitor-firebase/authentication library
@Injectable()
export class FirebaseAuthHelper {

  public applySignInOptions(options: SignInOptions, provider: OAuthProvider | GoogleAuthProvider | FacebookAuthProvider | TwitterAuthProvider) {
    if (options.customParameters) {
      const customParameters: FirebaseCustomParameters = {};
      options.customParameters.map(parameter => {
        customParameters[parameter.key] = parameter.value;
      });
      provider.setCustomParameters(customParameters);
    }
    if (options.scopes) {
      for (const scope of options.scopes) {
        provider.addScope(scope);
      }
    }
  }

  // ? (see: https://github.com/capawesome-team/capacitor-firebase/blob/9024eef856dbd25b2b6459e4b6bcee104ca89755/packages/authentication/src/web.ts#L594)
  public createSignInResult(userCredential: FirebaseUserCredential | null, authCredential: FirebaseAuthCredential | null): SignInResult {
    const userResult = this.createUserResult(userCredential?.user || null);
    const credentialResult = this.createCredentialResult(authCredential);
    const additionalUserInfoResult = this.createAdditionalUserInfoResult(userCredential);
    const result: SignInResult = {
      user: userResult,
      credential: credentialResult,
      additionalUserInfo: additionalUserInfoResult
    };
    return result;
  }

  // ? (see: https://github.com/capawesome-team/capacitor-firebase/blob/9024eef856dbd25b2b6459e4b6bcee104ca89755/packages/authentication/src/web.ts#L627)
  public createUserResult(user: FirebaseUser | null): User | null {
    if (!user) {
      return null;
    }
    const result: User = {
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      phoneNumber: user.phoneNumber,
      photoUrl: user.providerData[0].photoURL,
      providerId: user.providerData[0].providerId,
      tenantId: user.tenantId,
      uid: user.uid
    };
    return result;
  }

  // ? (see: https://github.com/capawesome-team/capacitor-firebase/blob/9024eef856dbd25b2b6459e4b6bcee104ca89755/packages/authentication/src/web.ts#L610)
  private createCredentialResult(credential: FirebaseAuthCredential | null): AuthCredential | null {
    if (!credential) {
      return null;
    }
    const result: AuthCredential = {
      providerId: credential.providerId
    };
    if (credential instanceof OAuthCredential) {
      result.accessToken = credential.accessToken;
      result.idToken = credential.idToken;
      result.secret = credential.secret;
    }
    return result;
  }

  // ? (see: https://github.com/capawesome-team/capacitor-firebase/blob/9024eef856dbd25b2b6459e4b6bcee104ca89755/packages/authentication/src/web.ts#L645)
  private createAdditionalUserInfoResult(credential: FirebaseUserCredential | null): AdditionalUserInfo | null {
    if (!credential) {
      return null;
    }
    const additionalUserInfo = getAdditionalUserInfo(credential);
    if (!additionalUserInfo) {
      return null;
    }
    const { isNewUser, profile, providerId, username } = additionalUserInfo;
    const result: AdditionalUserInfo = {
      isNewUser
    };
    if (providerId !== null) {
      result.providerId = providerId;
    }
    if (profile !== null) {
      result.profile = profile as { [key: string]: unknown };
    }
    if (username !== null && username !== undefined) {
      result.username = username;
    }
    return result;
  }
}
