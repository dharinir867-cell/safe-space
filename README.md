# SafeSpace

SafeSpace is a React web app for finding safer nearby places. This setup currently includes Firebase email/password authentication, profile selection, a home page, and Google Maps integration for the user's current location.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root.
3. Add your Google Maps API key:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Create a production build locally:
   ```bash
   npm run build
   ```

## Firebase Authentication Setup

1. Open the Firebase Console and create a project.
2. Add a Web app to the project and copy the Firebase config values.
3. In Firebase Authentication, enable the `Email/Password` sign-in provider.
4. Paste the config values into your local `.env` file.

The app uses Firebase email/password authentication for login and signup.

## Google Maps API Key

1. Open the Google Cloud Console.
2. Create or select a project.
3. Enable the Maps JavaScript API.
4. Create an API key under Credentials.
5. Paste the key into `.env` using the `VITE_GOOGLE_MAPS_API_KEY` variable.

If location access is denied in the browser, the app falls back to a default map center.

## Build Notes

- Build command: `npm run build`
- Output directory: `dist`
- The project includes `vercel.json` with a rewrite to `index.html` so React Router routes work correctly on Vercel.

## Deploy To Vercel

1. Push the project to GitHub, GitLab, or Bitbucket.
2. Import the repository into Vercel.
3. Vercel should detect the app as a Vite project automatically.
4. Set these environment variables in the Vercel project settings:
   - `VITE_GOOGLE_MAPS_API_KEY`
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
5. Deploy the project.

If you want to deploy with the Vercel CLI, use:

```bash
npm i -g vercel
vercel
```

For production deployment:

```bash
vercel --prod
```
