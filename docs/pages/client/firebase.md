# Firebase

The goal is to host the ReactJS app on Firebase Hosting, so our app is served from our Firebase Hosting URL.
A page is served as static page with the app JS bundle that is loaded in client side when opened on user browser.

# How to configure project

> This template is already ready to this so skip this step

It is recommended to use a package manager that uses a lockfile and caching for faster dev/test cycles:

- Yarn
- npm

**Set up firebase**
Create a project through the [firebase web console](https://console.firebase.google.com/) and Install [firebase-tools
](https://www.npmjs.com/package/firebase-tools).

Now you need to run Firebase `init` on the Root folder and select what you want to use, for this template we just use
what we really need that is Hosting. After that we need to create modify some files.

- Go on `package.json` and add scripts to build ReactJS, Functions and Deploy

```json
"predeploy": "yarn build",
"deploy": "firebase deploy --only hosting",
```

- On `firebase.json `:

```json
{
  "hosting": {
    "public": "build",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## CD (aka Continuous Delivery)

Always when we push into `main` branch, we run a pipeline on `github actions` that automatics deploy
the new files into Firebase.

## Command line

You can run the command `yarn deploy` this will generate the build files and upload to firebase functions and the
public folder.

### Keep in Mind

- Testing on Firebase locally requires a complete build of the ReactJS app. yarn serve handles everything required.
