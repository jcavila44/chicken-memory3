// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  path: {
    base: '/chicken-memory',
    player: '/player',
    game: '/game',
    history: 'app-user-history',
  },
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCP91m5a1Oq2CWskwewD2I3z2BjvoOE4xc",
    authDomain: "chicken-memory-ecd54.firebaseapp.com",
    databaseURL: "https://chicken-memory-ecd54-default-rtdb.firebaseio.com/",
    projectId: "chicken-memory-ecd54",
    storageBucket: "chicken-memory-ecd54.appspot.com",
    messagingSenderId: "271016625667",
    appId: "1:271016625667:web:29f49bc885ea055d947036"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
