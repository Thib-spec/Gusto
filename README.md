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

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

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

## Page **Fridge**
![_gusto_fridgeList](https://user-images.githubusercontent.com/65892547/148312895-599143dd-f60b-4ce7-b129-4dd2fadd45a2.png)
![_gusto_fridgeCards](https://user-images.githubusercontent.com/65892547/148312893-94cd9dc8-4551-4608-953a-a628dc62c6a3.png)
## Page **Preset**
![_gusto_presetCards](https://user-images.githubusercontent.com/65892547/148312899-add84774-d230-47d3-9199-a434f9ddc351.png)
![_gusto_PresetList](https://user-images.githubusercontent.com/65892547/148312901-bb3924f9-2d9b-4328-9c15-44bfa513dd05.png)
![_gusto_addModal](https://user-images.githubusercontent.com/65892547/148312892-4dd0d2f6-cebf-4c15-9084-357c0d2f2b18.png)
## Page **Login**
![_gusto_loginPage](https://user-images.githubusercontent.com/65892547/148312898-a02d7984-4ef3-4979-b9f6-08edfb8d0d74.png)


# Dossiers & Fichiers

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
