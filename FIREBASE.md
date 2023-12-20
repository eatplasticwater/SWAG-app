# Firebase instructions

### Prepare assets to deploy
Before deploying the app to Firebase Hosting, run `ionic build --prod`

### Multiple Environments with Firebase
For managing one site across different environments, we recommend multiple projects for promoting best practices of each environment having its own set of Firebase resources.

For example for this repo we will have two firebase projects:
- dev-ion4fullpwa
- basic-ionic-6-full-app

### Check available alias
Before deploying to Firebase Hosting make sure you are using the correct alias (dev, prod)
`firebase use` will list all the alias available
```
* dev (dev-ion4fullpwa)
  basic (basic-ionic-6-full-app)
```

### Create alias
If you don't see these alias (dev, prod), you should create them
`firebase use --add`
```
? Which project do you want to add? ion4fullpwa
? What alias do you want to use for this project? (e.g. staging) prod
```

### Select alias (switching environments)
`firebase use dev`

You can also use the `-P` flag to specify an alias like this:
``` bash
firebase deploy --only hosting -P dev
```

This will deploy to the `dev` alias/environment

### Serve and test your Firebase project locally
For more info see: https://firebase.google.com/docs/hosting/deploying
`firebase serve --only hosting`

---

## [Advanced uses](https://firebase.google.com/docs/cli/targets#deploy-target-commands)

### [Create target](https://firebase.google.com/docs/cli/targets#set-up-deploy-target-hosting)
- TARGET_NAME = 12-2021-release
- RESOURCE_IDENTIFIER (the SITE_ID) = basic-ionic-5-full-app
``` bash
firebase target:apply hosting 12-2021-release basic-ionic-5-full-app -P basic
```

- TARGET_NAME = 06-2022-release
- RESOURCE_IDENTIFIER (the SITE_ID) = basic-ionic-6-full-app
``` bash
firebase target:apply hosting 06-2022-release basic-ionic-6-full-app -P basic
```


### [Configure your `firebase.json` file to use deploy targets](https://firebase.google.com/docs/cli/targets#configure_your_firebasejson_file_to_use_deploy_targets)
Don't forget to configure this before deploying to the new target


## Deploy to specific target (i.e.: different site)
``` bash
firebase deploy --only hosting:06-2022-release -P basic
```


### Create preview channel
> Preview channels don't have Firebase auth configured automatically `Unable to add channel domain to Firebase Auth`
- CHANNEL_ID = 6-0-0
- TARGET_NAME = 02-2023-release
- PROJECT_ALIAS = basic
``` bash
firebase hosting:channel:deploy 6-0-0 --only 02-2023-release -P basic
```


---

# Update release process

## DEV
First test the changes on the dev site (dev-ionic-6-full-app)


### 1 - Create new target
> This updates the `.firebaserc` file

- TARGET_NAME = 02-2023-release
- RESOURCE_IDENTIFIER (the SITE_ID) = dev-ionic-6-full-app
- PROJECT_ALIAS = dev
``` bash
firebase target:apply hosting 02-2023-release dev-ionic-6-full-app -P dev
```


### 2 - Update firebase.json
> Manually update the file and add the new target (`02-2023-release`) config (just copy and paste from the previous one)


### [OPTIONAL] - Create preview channel for the latest update you want to test live
> Preview channels don't have Firebase auth configured automatically `Unable to add channel domain to Firebase Auth`
- CHANNEL_ID = 6-0-0
- TARGET_NAME = 02-2023-release
- PROJECT_ALIAS = dev
``` bash
firebase hosting:channel:deploy 6-0-0 --only 02-2023-release -P dev
```


### 3 - Deploy and test new version of the site
> Deploy the new version of the site
- TARGET_NAME = 02-2023-release
- PROJECT_ALIAS = dev
``` bash
firebase deploy --only hosting:02-2023-release -P dev
```

> Go to the preview channel and test it
[https://dev-ionic-6-full-app.web.app]


---

## LIVE (prod)
After you test the new version of the site, you can deploy to the production site (basic-ionic-6-full-app)


### 1 - Create new target
> This updates the `.firebaserc` file

- TARGET_NAME = 02-2023-release
- RESOURCE_IDENTIFIER (the SITE_ID) = basic-ionic-6-full-app
- PROJECT_ALIAS = basic
``` bash
firebase target:apply hosting 02-2023-release basic-ionic-6-full-app -P basic
```


### 2 - Deploy and test new version of the site
> Deploy the new version of the site
- TARGET_NAME = 02-2023-release
- PROJECT_ALIAS = basic
``` bash
firebase deploy --only hosting:02-2023-release -P basic
```

> Go to the preview channel and test it
[https://basic-ionic-6-full-app.web.app]
