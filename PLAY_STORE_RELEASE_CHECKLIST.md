# Play Store Release Checklist - Tiny Tiny Tok Tok

## 1. Local Build Environment
Because this cloud environment has limited native toolchain support (Android SDK/JDK), you should perform the final build on your local machine:
- Install **Android Studio**
- Install **Java JDK 17+**
- Clone this repository locally.

## 2. Generating the Signed AAB/APK
To release on the Play Store, you MUST sign the application with a private key (Keystore).
1. Open the `/android` folder in Android Studio.
2. Go to **Build > Generate Signed Bundle / APK...**.
3. Select **Android App Bundle** (Recommended for Play Store).
4. Create a new Keystore or use an existing one (KEEP THIS FILE SAFE).
5. Build the `release` variant.

## 3. Play Store Assets (Already Generated)
- **App Icon**: `/src/assets/icon.png` (1024x1024)
- **Feature Graphic**: `/src/assets/images/feature_graphic_banner_...png` (1024x500)
- **Screenshots**: `/src/assets/images/play_store_screenshot_...png`
- **Descriptions**: Refer to `/play_store_assets.md`

## 4. Required Legal Pages
Ensure the following pages are live and their URLs are provided to Google:
- **Privacy Policy**: `/privacy`
- **Terms of Service**: `/terms`

## 5. Firebase Production Setup
1. Fill in the real `google-services.json` in `/android/app/`.
2. Ensure Firestore Rules are deployed (I have deployed the latest version).
3. Set your Firebase project to `Blaze` plan if you expect high traffic (free limits apply otherwise).

## 6. Pre-Launch Testing
- Use **Internal Testing** track in Google Play Console manually.
- Add test users to verify the "Invitation System" and "Rewards".

---
**Tiny Tiny Tok Tok AI Engine v2.4 (Production Stack)**
