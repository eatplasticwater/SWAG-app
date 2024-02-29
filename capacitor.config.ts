import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.americanavalancheassociation.swag',
  appName: 'SWAG',
  webDir: 'www',
  bundledWebRuntime: true,
  plugins: {
    SplashScreen: {
      launchAutoHide: true
    },
    FirebaseAuthentication: {
      skipNativeAuth: true,
      providers: [
        "google.com",
        "twitter.com",
        "facebook.com",
        "apple.com"
      ]
    }
  }
};

export default config;
