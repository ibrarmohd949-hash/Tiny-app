# Tiny Tiny Tok Tok 🚀

The viral social media platform for Gen-Z creators. Build with a modern stack featuring React, Vite, Tailwind CSS, and Capacitor.

![Build Status](https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>/actions/workflows/android-build.yml/badge.svg)

## ✨ Features
- **TT AI Engine**: Hyper-personalized video recommendation feed.
- **Creator Dashboard**: Pro-level analytics and growth tracking.
- **Glassmorphism UI**: Premium, modern design aesthetic.
- **Capacitor Mobile**: Ready for Android & iOS deployment.

## 🛠️ Tech Stack
- **Frontend**: React 18, Vite (Ultra-fast HMR)
- **Styling**: Tailwind CSS
- **Database/Auth**: Firebase Firestore & Firebase Auth
- **Animations**: Motion (formerly Framer Motion)
- **Deployment**: Google Cloud Run / Play Store

## 🚀 Deployment

### Deploy to Vercel (Recommended)
1. Ensure your code is pushed to your GitHub repository from AI Studio.
2. Connect your repository to [Vercel](https://vercel.com).
3. Vercel will automatically detect the configuration.
4. **Environment Variables**: Add your `GEMINI_API_KEY` (and any other secrets) in the Vercel Dashboard -> Settings -> Environment Variables.
5. **Root Directory**: Ensure the root directory is set to the project root (default), where `package.json` is located.
6. **Framework Preset**: Vercel will auto-detect "Vite".
7. Deployment will automatically use `vercel.json` to handle the API routes and SPA rewrites.

### Deploy to Cloud Run
1. Use the "Deploy to Cloud Run" feature in AI Studio.
2. The environment is pre-configured to build the bundle and start the Express server.

## 🚀 Getting Started

### Local Development
1. Clone the repo: `git clone <repo-url>`
2. Install deps: `npm install`
3. Start dev server: `npm run dev`

### Building Android APK (Local)
1. Build web project: `npm run build`
2. Sync with Android: `npx cap sync`
3. Open in Android Studio: `npx cap open android`
4. Build > Build APK(s)

## 🤖 CI/CD (GitHub Actions)
This repository is pre-configured with a GitHub Action that builds your Android App Bundle (.aab) automatically.

To enable **automatic signing**, add the following Secrets to your GitHub repository under **Settings > Secrets and variables > Actions**:
1. `SIGNING_KEY`: Your base64 encoded keystore file.
2. `ALIAS`: Your key alias.
3. `KEY_STORE_PASSWORD`: Keystore password.
4. `KEY_PASSWORD`: Key password.

Check the **Actions** tab in your GitHub repository to download the generated build artifacts.

## ⚖️ License & Legal
- [Terms and Conditions](https://ais-pre-nqpckq4wuqkkru6v6fx6bl-350757739770.asia-southeast1.run.app/terms)
- [Privacy Policy](https://ais-pre-nqpckq4wuqkkru6v6fx6bl-350757739770.asia-southeast1.run.app/privacy)

---
*Tiny Tiny Tok Tok AI Engine v2.4*
