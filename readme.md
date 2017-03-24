# Lagoon App v2

### Pré-requis

 1. Générer le google-services.json à cette [adresse](https://developers.google.com/mobile/add?platform=android&cntapi=signin&cnturl=https://developers.google.com/identity/sign-in/android/sign-in?configured=true&cntlbl=Continue%20Adding%20Sign-In)
 2. Placer le google-services.json dans le dossier `android/app`
 3. [Installer react-native en global](https://facebook.github.io/react-native/docs/getting-started.html)
 4. `npm install` sa mère
 5. `cd ios && pod install` pour build la version iOS sous Mac OSX

### Run

 1. `npm run start` pour build le package react-native
 2. `react-native run-android` pour build l'appli sous Android et la lancer dans un émulateur (requiert le SDK Android)
 2. `react-native run-ios` pour build l'appli sous iOS et la lancer dans un émulateur (requiert xcode)
