# Firebase

> ⚠️ CAUTION! **Any npm modules dependencies used in the Next.js app `(app/ folder)` must also be installed as dependencies for the
> Cloud Functions project `(functions folder)`**.

The goal is to host the Next.js app on Firebase Cloud Functions with Firebase Hosting rewrite rules, so our app is
served from our Firebase Hosting URL. Each individual page bundle is served in a new call to the Cloud Function
which performs the initial server render.

# How to configure project

> This template is already ready to this so skip this step

It is recommended to use a package manager that uses a lockfile and caching for faster dev/test cycles:

- Yarn
- npm

**Set up firebase**
Create a project through the [firebase web console](https://console.firebase.google.com/) and Install [firebase-tools
](https://www.npmjs.com/package/firebase-tools).

Now you need to run Firebase `init` on the Root folder and select what you want to use, for this template we just use
what we really need that is Functions and Hosting. After that we need to create modify some files.

- Go on `package.json` and add scripts to build NextJS, Functions and Deploy

```json
"build:next": "next build",
"build:functions": "cd \"functions\" && npm install",
"build": "yarn build:next && yarn build:functions",
"predeploy": "yarn build && mv -f build/ functions/next",
"postdeploy": "rm -rf functions/next",
"deploy": "firebase deploy"
```

- On `next.config.js` add this line:

```js
distDir: '/build'
```

- On `firebase.json `:

```json
  "hosting": {
    "public": "public",
    "ignore": [
      ".firebase/**",
      ".firebaserc",
      "firebase.json",
      "**/node_modules/**",
      "**/public/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "function": "next"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(eot|otf|ttf|ttc|woff|font.css)",
        "headers": [
          {
            "key": "Access-Control-Allow-Origin",
            "value": "*"
          }
        ]
      },
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=604800"
          }
        ]
      },
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|ico)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=604800"
          }
        ]
      }
    ]
  }
```

Now we need to configure the functions folder, we need to install some packages:

- next
- react
- react-dom
- @types/node
- @types/react

and set `engines` on `package.json` as 12.

Now on the `functions/src/index.ts` we need to create a functions with the name `next`

```ts
import * as functions from 'firebase-functions'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, conf: { distDir: 'next' } })
const handle = app.getRequestHandler()

exports.next = functions.https.onRequest(async (req, res) => {
  await app.prepare()
  handle(req, res)
})
```

## CD (aka Continuous Delivery)

Always when we push into `main` branch, we run a pipeline on `github actions` that automatics deploy
the new files into Firebase.

## Command line

You can run the command `yarn deploy` this will generate the build files and upload to firebase functions and the
public folder.

### Keep in Mind

- Because NextJS have SSR we use `Firebase Functions` to deploy so whatever you upload as public folder will never be
  reach.
- Your Firebase project needs to be in the plan blaze, or **functions will not work**!
- Testing on Firebase locally requires a complete build of the Next.js app. yarn serve handles everything required.
- **Any npm modules dependencies used in the Next.js app `(app/ folder)` must also be installed as dependencies for the
  Cloud Functions project `(functions folder)`**.
