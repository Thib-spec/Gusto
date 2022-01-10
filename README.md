# Explication des scripts du project Front

## Scripts disponibles : 

Dans le dossier du projet, vous pouvez exécuter :

### `npm start`
(Execute `npm run dev:nams`)\
Ce script a pour but de : 
- lancer l'application React dans le mode **development**
- lancer un mock server api


### `npm run react-start`
(Execute `react-scripts start`)\
Script de base lors de la création d'une application React.\
Execute l'application web dans le mode **development**.\
Ouvrez [http://localhost:3000](http://localhost:3000) pour voir l'application dans votre navigateur.

### `npm run dev:nams`
Execute simultanément les scripts `npm run nams-start:development` & `npm run react-start`.

### `npm run dev:json-server`
Execute simultanément les scripts `npm run json-server-start:development` & `npm run react-start`.

### `npm run nams-start:development`
Lance un mock serveur basé sur le module npm [nams](https://www.npmjs.com/package/nams).\
La configuration de ce server se situe dans le dossier `dev/nams`.

### `npm run json-server-start:development`
Lance un mock serveur basé sur le module npm [json-server](https://www.npmjs.com/package/json-server).\
La configuration de ce server se situe dans le dossier `dev/json-server`.

### `npm run test`

Script de base lors de la création d'une application React.
Lance les test dans un mode interactif.\
regardez la section [running tests](https://facebook.github.io/create-react-app/docs/running-tests) pour plus d'informations.

### `npm run build`

*Build* l'application pour la production dans le dossier `build`.\
Crée un bundles de l'application React dans le mode **production** et optimise le *build* pour une meilleure performance.

Regardez la section [deployment](https://facebook.github.io/create-react-app/docs/deployment) pour plus d'informations.

### `npm run eject`

Script de base lors de la création d'une application React.

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**




## En Savoir plus

Vous pouvez en savoir plus dans la [documentation de Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

pour apprendre React, consultez la [documentation React](https://reactjs.org/).

### Code Splitting

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyse de la taille du Bundle

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Créer une application Web progressive

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Configuration avancée

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Déploiement

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` échoue a minifier

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Localisation des composants

## Page **Header**
![_gusto_Header](https://user-images.githubusercontent.com/65896884/148683821-78e0951b-d9ec-407e-8061-44bcf5563c04.png)
## Page **Fridge**
![_gusto_fridgeList](https://user-images.githubusercontent.com/65892547/148312895-599143dd-f60b-4ce7-b129-4dd2fadd45a2.png)
![_gusto_fridgeCards](https://user-images.githubusercontent.com/65892547/148312893-94cd9dc8-4551-4608-953a-a628dc62c6a3.png)
## Page **Preset**
![_gusto_presetCards](https://user-images.githubusercontent.com/65892547/148312899-add84774-d230-47d3-9199-a434f9ddc351.png)
![_gusto_PresetList](https://user-images.githubusercontent.com/65892547/148312901-bb3924f9-2d9b-4328-9c15-44bfa513dd05.png)
![_gusto_addModal](https://user-images.githubusercontent.com/65892547/148312892-4dd0d2f6-cebf-4c15-9084-357c0d2f2b18.png)
## Page **Login**
![_gusto_loginPage](https://user-images.githubusercontent.com/65892547/148312898-a02d7984-4ef3-4979-b9f6-08edfb8d0d74.png)
## Page **Menu**
![_gusto_Menu1](https://user-images.githubusercontent.com/65896884/148684124-3e8bd2b9-7f3d-4265-a888-074d619b0a42.png)
![_gusto_Menu2](https://user-images.githubusercontent.com/65896884/148684142-2e22b603-68af-4fbe-8936-05775bcbabca.png)
## Page **Product**
![_gusto_Product1](https://user-images.githubusercontent.com/65896884/148684611-30fa6434-1fe7-4720-b298-6717d1e7b636.png)
![_gusto_Product2](https://user-images.githubusercontent.com/65896884/148684585-00d6edc4-c4c3-4a1a-8ad0-a13b6067f8cc.png)
## Page **Category**
![_gusto_Category](https://user-images.githubusercontent.com/65896884/148684898-9a90c02c-a366-4316-810f-9c037744fcbb.png)


# Traduction

La traduction de l'application se fait grâce au module `i18next` qui est l'une des solutions d'internationalisation les plus populaires.

Exemple d'intégration dans une application React\
(utilisation de la solution app.i18nexus.com dans cette exemple) : 

```js
import i18next from "i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const apiKey = "kjvfhkdvfhiqjvivkvfnisvruik";
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",

    ns: ["default","common","validation"],
    defaultNS: "default",

    supportedLngs: ["en","de","fr"],
    
    backend: {
      loadPath: loadPath
    }
  })
```

Dans notre cas, nous utilisons des fichier JSON de traduction accessibles à l'URL `http://{front_ip}:{front:port}/locales/{{lng}}/{{ns}}.json`, et dans le code dans le dossier `public`.\
Par convention les différents namespace sont `common`, `default` et `validation`. (voir si nécessaire) :

```js
import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

/**
 * fichier de configuration du module i18n (module d'internationalisation)
 * voir https://i18nexus.com/ pour plus d'informations
 */

const loadPath = "/locales/{{lng}}/{{ns}}.json"; // can be an URL

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    backend: {
      loadPath
    },
    ns: ["default","common","validation"],
    defaultNS: "common",
    lng: "en",
    supportedLngs: ["en","fr"],
    debug: true,
  });

export default i18n;
```

Exemple des clés utilisés dans le fichier JSON `public/locales/fr/common.json`:
```json
{
  "language.french": "Francais",
  "language.english": "Anglais",
  "LoginPage.placeholder.email": "Email",
  "LoginPage.placeholder.password": "Mot de passe",
  "LoginPage.Text.stayConnected": "Rester connecté ?",
  "LoginPage.Text.forgottenPassword": "Mot de passe oublié ?",
  "Button.connexion": "Connexion",
  "fridge.status.livraisonEnCours": "Livraison en cours",
  "fridge.status.horsService": "Hors service",
  "fridge.status.inProduction": "En production"
}

```


# Dossiers & Fichiers

Le dossier page renseigne toutes les pages existantes sur l'app. 
Le dossier Components renseigne toute les fonctionnalités de l'app avec 1 dossier par fonctionnalité ainsi chaque page possède un dossier attitré dans components.

![image](https://user-images.githubusercontent.com/65896884/148081713-4f3f01c7-4ea4-4caf-9888-72b527f17136.png)
![image](https://user-images.githubusercontent.com/65896884/148081854-4bd27fd9-2a73-4d90-a60c-86ce796cc2cb.png)
![image](https://user-images.githubusercontent.com/65896884/148081940-5a68735f-b79b-407e-a2c7-ed03f437cf74.png)

## Lucas

    - Components/FridgePage2/*

    - Components/PresetPage/*
    - Components/_LanguageSelector
    - Components/Page

    - configFiles/i18n

    - Context/*

    - CSS/colors
    - CSS/loginPage
    - CSS/presetPage.scss

    - helpers/*

    - Pages/FridgesPage4
    - Pages/LoginPage
    - Pages/PresetPage2

    - Routes/AdminRouter

    - store/*

## Nicolas

    - autres
    
    
# Fonctionalités inachevés 

Setup de la librairie Chart.js permettant de faire des graphiques. Cela permettrait de d'informer le client de ses ventes dans un format plus visuel qui serait affiché sur la page d'accueil.

Setup de l'upload d'image coté front cette fonctionnalité fonctionne en local, mais pas en production.



