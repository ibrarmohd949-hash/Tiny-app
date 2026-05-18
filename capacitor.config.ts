import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tinytinytoktok.app',
  appName: 'Tiny Tiny Tok Tok',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#000000",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      spinnerColor: "#ff2d55",
      splashFullScreen: true,
      splashImmersive: true,
    }
  },
  server: {
    androidScheme: 'https'
  }
};

export default config;
