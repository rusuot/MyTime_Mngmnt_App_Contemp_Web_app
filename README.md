# Contemporary Web Applications (QHO640) - AE2
# Project Title: Students Time Management web application 

## Link to hosted web-app: 
- https://contemporary-web-app-6f54f.web.app
- https://contemporary-web-app-6f54f.firebaseapp.com


## My GitHub official/clean link: [to be added - the last repo created]
###### My GitHub history link (drafts):  https://github.com/rusuot/MyTime_Mngmnt_App_Contemp_Web_app
I have worked on a separate repo as I'm facing some issues with pushing commits directly from Visual Code, hence each time I'm uploading files in GIT.
### Student Name: Rusu Ovidiu Tiberiu
### Student ID: 10179295

## Tech
What I have used for this project:
- [Visual Code](https://code.visualstudio.com/)
- [Google Firebase](https://firebase.google.com/)
- [node.js](https://code.visualstudio.com/docs/nodejs/nodejs-tutorial)
- [React](https://react.dev/)
- [Contemporary Web Applications (QHO640) courses Solent University](https://learn.solent.ac.uk/course/view.php?id=54766&section=9#tabs-tree-start)
- [Courses - GitHub support](https://joeappleton18.github.io/web-dev-2021-notes/sessions/week_1/#why-do-we-even-need-webpack)
- [Exercises solutions - GitHub support](https://github.com/joeappleton18/running-contemp-web-app-solutions/branches/stale)
- [Dillinger](https://dillinger.io/)

## Installation
> Note: `There are two approaches: either the Firebase data that I tried to include in GIT is used, or Firebase details needs to be updated with your personal`
> Note: `For using my files for Firebase, after you unzip the code downloaded, please update firebase folder name with prefix "." as of course it's a hidden folder and I was needed to rename it to be able to upload this to GIT. 
So, instead of "firebase" folder please rename it into:".firebase" in Visual Code` 

Steps to follow for project installation:
1. Download the zip from GIT link: (need node.js)
2. Open Visual Code, open folder downloaded unzipped folder at step 1
3. Install dependencies by running:
```sh
npm install
```
4. If the downloaded unzipped file does not contain in root folder the .env.dev file, this needs to be created with following details in the root folder:
```sh
// environment variables (used for my firebase connection)
REACT_APP_API_KEY="AIzaSyD3nEy7eJOLfygUpe2JrCFzb-VkxZc05Fk"
REACT_APP_AUTH_DOMAIN="contemporary-web-app-6f54f.firebaseapp.com"
REACT_APP_PROJECT_ID="contemporary-web-app-6f54f"
REACT_APP_STORAGE_BUCKET="contemporary-web-app-6f54f.appspot.com"
REACT_APP_MESSAGING_SENDER_ID="G-7SM38NPZGH"
REACT_APP_APP_ID="1:815549909710:web:ef50f861e9674f7368de9f"
```
If you choose to use your personal Firebase api_key, auth_domain and so on, you need to update those values in my react app env variables. Below Firebase steps are detailed to be followed.

5. Firebase 
Note: this is needed if firebase files are not in unzipped folder / expired, or you choosed to use your personal ones.
- Create an account into [Firebase](https://console.firebase.google.com/)
- Into "Your Firebase projects", select "+" sign to "Add project"
- Register Web application on Firebase.
From here, you'll have access to firebase configs.
E.g.:

```sh
Projet ID:  contemporary-web-app-6f54f
```
```sh
npm install firebase
```
And:
```sh
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3nEy7eJOLfygUpe2JrCFzb-VkxZc05Fk",
  authDomain: "contemporary-web-app-6f54f.firebaseapp.com",
  projectId: "contemporary-web-app-6f54f",
  storageBucket: "contemporary-web-app-6f54f.appspot.com",
  messagingSenderId: "815549909710",
  appId: "1:815549909710:web:ef50f861e9674f7368de9f",
  measurementId: "G-7SM38NPZGH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
```
And run:
```sh
npm install -g firebase-tools
```
From example above: "apiKey" value must be paste it into root folder, in file: .env.dev as REACT_APP_API_KEY value.
For email & pass auth:
- create db in web app (still on Firebase) in production mode and change rules "Allow read/write" access to any user signed in to the application
```sh
// Set next rules to allow read & write for any user
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null; }}}
```
> Note: `This Firebase db creation must be followed if my values does not work, I'll try to keep them saved in GIT. /or if you choosed to use your personal ones` 



Having all set related to Firebase, run now the students time managemnet web application:
1. In Visual Code, where you have the folder unzipped & .env.dev file set with Firebase open Terminal
2. Run next command:
```sh
npm run start
```
3. The app will start with success at: 
- http://localhost:3000/ 
4. In Web you will get next 3 Firebase Errors (see them in Network Tool - press F12):
- toast: "Error! Hint: Firebase indexes might not be created yet!!! The data can not be fetched. "
- Error in F12: "FirebaseError: The query requires an index. You can create it here: ..." 
Select the url from all 3 errors received in order to create the 3 needed indexes in Firebase DB: mytodos, activities, history.
Once they are successfully created will have the status: Enabled (in Firebase website)
Something similar with (in firebase website):
```sh
Collection ID	Fields indexed
Query scope		Status	
mytodos	user Ascending createdAt Descending __name__ Descending	Collection		Enabled	
history	user Ascending createdAt Descending __name__ Descending	Collection		Enabled	
activities	user Ascending createdAt Descending __name__ Descending	Collection		Enabled
```
5. Now you can use the Time Management App, as you wish.
Hint: 
- my user: 1@1.com
- my password: 1234567

## Firebase Hosting
1. In Firebase website, in left pane, under Project shortcuts, select "Hosting" and click on "Get started".
2. Firebase Hosting provides next commands to be run in Visual Code terminal:
```sh
npm install -g firebase-tools
```
```sh
firebase login
```
For firebase init, select Hosting option and select the existing project created in Firebase.
```sh
firebase init
```



```sh
npm run build:deploy
```
In Visual Code terminal, Firebase init logs looks like:
```sh
=== Deploying to 'contemporary-web-app-6f54f'...

i  deploying hosting
i  hosting[contemporary-web-app-6f54f]: beginning deploy...
i  hosting[contemporary-web-app-6f54f]: found 7 files in public
+  hosting[contemporary-web-app-6f54f]: file upload complete
i  hosting[contemporary-web-app-6f54f]: finalizing version...
+  hosting[contemporary-web-app-6f54f]: version finalized
i  hosting[contemporary-web-app-6f54f]: releasing new version...
+  hosting[contemporary-web-app-6f54f]: release complete

+  Deploy complete!

Project Console: https://console.firebase.google.com/project/contemporary-web-app-6f54f/overview
Hosting URL: https://contemporary-web-app-6f54f.web.app
```

Notes/troubleshooting from Firebase Hosting:

----
- Where are Firebase Hosting details for website hosted?:
I have selected "Go To Console" in Firebase Hosting website, and in:
https://console.firebase.google.com/project/contemporary-web-app-6f54f/hosting/sites/contemporary-web-app-6f54f
In left pane, under Projects Shortcuts, in Hosting I have "Mange Site" Dashboard with:
contemporary-web-app-6f54f.web.app
contemporary-web-app-6f54f.firebaseapp.com
----

- Notes:  When I was running firebase deploy command in Visual Code Terminal, when I was asked about folder to be choosed: default is givven: (public) but I've put "build" folder. I for firebase deploy!!!
As a short hint: have the exactly same content for index.html in both /public and /build folder.
- Firebase Hosting should run without any issues, as the time expiration is set for the end of february, but I will extend as days go by (there is a limit of 30 days), you should not have any issues even with my Firebase details.

- History of commands in Visual Terminal that might help:
  - npm run build:deploy
  - firebase deploy
  - firebase init
  - firebase deploy
---
