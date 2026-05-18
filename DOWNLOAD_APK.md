# How to Download Tiny Tiny Tok Tok APK/AAB

Since this is a mobile app powered by Capacitor, the final Android build happens on **GitHub Actions** for your convenience.

## Steps to Get Your APK:

1. **GitHub Repository**: Make sure you have pushed this code to your GitHub account.
2. **Go to Actions**: On your GitHub repository page, click the **"Actions"** tab at the top.
3. **Select Workflow**: Click on the **"Build Android APK"** workflow (the one I created).
4. **Download Artifacts**: 
   - Once the build finishes (usually 3-5 minutes), scroll down to the **"Artifacts"** section.
   - You will see a file named `release-assets`.
   - Click it to download a ZIP containing both the **APK** (for your phone) and the **AAB** (for Play Store).

## Live Web Link:
The live web version of the app is available at:
**[Tiny Tiny Tok Tok Live Preview](https://ais-pre-nqpckq4wuqkkru6v6fx6bl-350757739770.asia-southeast1.run.app)**

## Troubleshooting Deployment:
If you are using Vercel or GitHub Pages and see a 404:
- **Vercel**: I have added a `vercel.json` to handle the routing correctly.
- **GitHub Pages**: Note that the AI features (Express backend) will NOT work on GitHub Pages as it only supports static files. Use the provided Live Preview link for full functionality.

---
*Tiny Tiny Tok Tok AI Engine v2.4*
