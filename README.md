# Gusto

## Exécution

* Ouvrir une invite de commande et se positionner dans le dossier src
* Lancer la commande "npm install" afin d'installer les dépendances
* Lancer la commande "npm start" afin de lancer le serveur

## Architecture

![image](https://user-images.githubusercontent.com/60107479/147947505-6c194878-8892-437c-9029-52685740e3a3.png)

* Le dossier node_modules contient l'ensemble des dépendances utilisées par nodeJS
* Le fichier .env contient nos variables d'environnements qui sont ici définies une seule fois et réutilisées par la suite
* Les fichiers package.json et package-lock.json répertorient simplement les différents modules installés pour le bon fonctionnement du projet

### src

* Le dossier src contient l'ensemble du code avec notamment le fichier "app.js" contenant la configuration de notre serveur et de notre api ainsi que le fichier "server.js" permettant de lancer notre serveur

* Le dossier "database" contient la configuration de la base de données ainsi que l'ensemble des modèles (tables) créés
* Le dossier "controller" contient l'ensemble des controllers soit des fonctions qui intéragissent avec nos modèles afin de récupérer, modifier, ajouter ou supprimer des données
* Le dossier "routes" contient quant à lui l'ensemble des routes définies pour chaque controller soit la syntaxe de l'url de la requête à effectuer ainsi que la fonction à effectuer
* Le dossier "helpers" contient l'ensemble des fonctions nécessaires à l'authentification jwt ainsi que le hashage des mots de passe
* Le dossier middleware permet lui de sauvegarder une image côté back dans le dossier images (fonctionne en local mais pas en prod)

### config

* Le dossier passport contient la configuration du module "passport" permettant de paramétrer une authentification jwt
* Le dossier swaggerUi comprend essentiellement notre swagger, soit une documentation intéractive de l'api


## API

Pour accéder à la documentation de l'api il faut se rendre à l'adresse suivante : http://localhost:3001/api-docs/  ( ou en prod : http://api.gustosolutions.fr/api-docs/).
On accède alors à l'ensemble des routes créées ainsi que les paramètres s'y rattachant.

Afin de tester les différentes routes, il est possible de le faire depuis swagger directement ou alors de renseigner l'url http://localhost:3001/api/... en local 
ou http://api.gustosolutions.fr/api/... en production

Afin d'effectuer les différents tests il est fortement conseillé d'utiliser Postman, logiciel permettant d'appeler des reqêtes API facilement : https://www.postman.com/downloads/

On précise les routes dont le body prend la forme d'un array : 
* POST => api/fridgePreset/id/addProduct
* PUT => api/fridgePreset/id/editProduct
* DELETE => api/fridgePreset/id/removeProduct
* POST => api/fridgePreset/id/addMenu
* DELETE => api/fridgePreset/id/removeMenu
* POST => api/menu/id/products
* DELETE  => api/menu/id/removeProduct

 ## Fonctionalités non achevées
 
 ### Upload
L'upload d'image fonctionne grâce à 3 fichiers, "upload.js" dans le dossier "middleware", "upload.js" dans le dossier "controller" et "upload.js" dans le dossier "routes". Le but de cette route est de pouvoir sauvegarder côté serveur une image qui aura été déposée via un système de drag and drop dans le front. Cette route fonctionne très bien en local mais provoque une erreur serveur en production dès la connexion au site.
 
 ### Sécurisation des routes avec des middleware
 Il est nécessaire de sécuriser l'ensemble des routes créées via l'implémentation de middleware. Le but est de vérifier pour chaque route en appelant req.user (pour avoir les informations de l'utilisateur connecté) que l'utilisateur a bien la permisssion d'appeler la route.
 
 ### Routes avec passport
 Pour l'instant certaines routes possèdent une configuration passport permettant d'accéder aux informations de l'utilisateur connecté. Il est alors possible de limiter les infos reçues par l'api en renvoyant uniquement les informations propres à l'utilisateur. Pour le moment seules les routes GET renvoi les informations propres à l'utilisateur mais il est nécessaire d'appliquer la même logique pour les routes POST, PUT et DELETE.
 
### Implémentation de test pour certains controllers
Des tests ne sont pas implémentés dans certaines fonctions du dossier "controller" (voir code) . Pour les implémenter il serait nécessaire de créer des modèles sur la base du modèle "fridge_product" afin de pouvoir accéder à cette table depuis le code et donc d'effectuer la vérification.


