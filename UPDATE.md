# Update process

## Capacitor 4

### Update from Capacitor 3 to Capacitor 4
> Install the latest version of the Capacitor CLI to your project
``` bash
npm i -D @capacitor/cli@latest
```

>Use the CLI to handle the migration for you
``` bash
npx cap migrate
```

The migration should be smooth, and all the steps required both for iOS and Android are handled by the CLI. However, you can check both iOS and Android specific migration steps here:
- [iOS update](https://capacitorjs.com/docs/updating/4-0#ios)
- [Android update](https://capacitorjs.com/docs/updating/4-0#android)


---


### Update Capacitor plugins
> All Capacitor official plugins were updated when running the migration tool.
> The Capacitor community plugins need to be updated manually
``` bash
npm install --save @capacitor-firebase/authentication@1.3.0
```

> Make sure you run this command after updating the Capacitor plugins
``` bash
npx cap sync
```


---


## Ionic 6.5.0

### Update to Ionic 6.5.0
``` bash
ng update @ionic/angular@latest --create-commits
```

### Update Ionic dev dependencies
``` bash
ng update @ionic/angular-toolkit @ionic/cli --create-commits
```


--


## Angular 15

> Make sure the Angular CLI is up-to-date
``` bash
npm install -g @angular/cli
```

### Update from Angular 13 to Angular 14
> We should update first to Angular 14 and then to Angular 15
``` bash
ng update @angular-eslint/schematics@14 @angular/core@14 @angular/cli@14 --create-commits
```

### Update from Angular 14 to Angular 15
> Then we can update Angular 15
``` bash
ng update @angular/fire @angular-eslint/schematics@15 @angular/core@15 @angular/cli@15 --create-commits
```


## Other dependencies
> First check outdated dependencies by running this command
``` bash
npm outdated --depth=0 --long
```

### Update dependencies
``` bash
npm install --save firebase
npm install --save core-js
npm install --save dayjs
npm install --save google-libphonenumber
npm install --save rxjs@7.8.0
npm install --save swiper
npm install --save tslib
npm install --save zone.js
```

### Update dev dependencies
``` bash
npm install --save-dev @commitlint/cli @commitlint/config-angular
npm install --save-dev @types/node
npm install --save-dev @webcomponents/webcomponentsjs
npm install --save-dev ts-node
```


# 2023-02-01 Updated dependencies list
> Check by running this command:
``` bash
npm list --depth=0
```

- @angular-devkit/architect@0.1501.2
- @angular-devkit/build-angular@15.1.2
- @angular-devkit/core@15.1.2
- @angular-devkit/schematics@15.1.2
- @angular-eslint/builder@15.2.0
- @angular-eslint/eslint-plugin@15.2.0
- @angular-eslint/eslint-plugin-template@15.2.0
- @angular-eslint/schematics@15.2.0
- @angular-eslint/template-parser@15.2.0
- @angular/animations@15.1.1
- @angular/cli@15.1.2
- @angular/common@15.1.1
- @angular/compiler@15.1.1
- @angular/compiler-cli@15.1.1
- @angular/core@15.1.1
- @angular/fire@7.5.0
- @angular/forms@15.1.1
- @angular/language-service@15.1.1
- @angular/platform-browser@15.1.1
- @angular/platform-browser-dynamic@15.1.1
- @angular/router@15.1.1
- @angular/service-worker@15.1.1
- @capacitor-firebase/authentication@1.3.0
- @capacitor/android@4.6.2
- @capacitor/app@4.1.1
- @capacitor/cli@4.6.2
- @capacitor/core@4.6.2
- @capacitor/geolocation@4.1.0
- @capacitor/haptics@4.1.0
- @capacitor/ios@4.6.2
- @capacitor/keyboard@4.1.1
- @capacitor/preferences@4.0.2
- @capacitor/share@4.1.0
- @capacitor/splash-screen@4.1.3
- @capacitor/status-bar@4.1.1
- @commitlint/cli@17.4.2
- @commitlint/config-angular@17.4.2
- @ionic/angular@6.5.0
- @ionic/angular-toolkit@7.0.0
- @ionic/cli@6.20.8
- @types/core-js@2.5.5
- @types/node@17.0.45
- @typescript-eslint/eslint-plugin@5.49.0
- @typescript-eslint/parser@5.49.0
- @webcomponents/webcomponentsjs@2.7.0
- angular-pipes@10.0.0
- cordova-res@0.15.4
- core-js@2.6.12
- dayjs@1.11.7
- eslint@8.32.0
- firebase@9.16.0
- google-libphonenumber@3.2.31
- husky@4.3.8
- rxjs@7.8.0
- swiper@8.4.6
- ts-node@8.10.2
- tslib@2.4.1
- typescript@4.8.4
- zone.js@0.11.8


---


# Tags
To create an annotated tag, enter the following:
``` bash
git tag -a 02-2023_basic-update -m '02-2023 BASIC update'
```
Then run:
``` bash
git push origin --tags
```


---


# Miscellaneous
> When updating an existing project you may want to get a specific file from another branch

### Cherry-pick files from another git branch
> Get just one file from another branch
``` bash
git checkout pro-version -- src/global.scss
git checkout pro-version -- src/app/firebase/auth/firebase-auth.helper.ts
git checkout pro-version -- src/app/firebase/auth/firebase-auth.module.ts
```
