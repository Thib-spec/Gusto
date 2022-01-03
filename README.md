# Gusto

## Exécution

* Ouvrir une invit de commande et se positionner dans le dossier src
* Lancer la commande npm install afin d'installer les dépendances
* Lancer la commande npm start afin de lancer le serveur

## Architecture

![image](https://user-images.githubusercontent.com/60107479/147947505-6c194878-8892-437c-9029-52685740e3a3.png)

* Le dossier node_modules contient l'ensemble des dépendances utilisées par nodeJS
* Le fichier .env continet nos variables d'environnements qui sont ici définies une seule fois et réutilisées par la suite
* Les fichiers package.json et package-lock.json répertorient simplement les différents modules installés pour le bon fonctionnement du projet

### src

* Le dossier src contient l'ensemble du code avec notamment le fichier "app.js" contenant la configuration de notre serveur et de notre api ainsi que le fichier "server.js" permettant de lancer notre serveur

* Le dossier database contient la configuration de la base de données ainsi que l'ensemble des modèles (tables) créés
* Le dossier controller contient l'ensemble des controllers soit des fonctions qui intéragissent avec nos modèles afin de récupérer, modifier, ajouter ou supprimer des données
* Le dossier routes contient quant à lui l'ensemble des routes définies pour chaque controller soit la syntaxe de l'url de la requête à effectuer ainsi que la fonctionà effectuer
* Le dossier helpers contient l'ensemble des fonctions nécessaire à l'authentification jwt ainsi que le hashage des mots de passe
* Le dossier middleware permet lui de sauvegarder une image côté back dans le dossier images (fonctionne en local mais pas en prod)

### config

* Le dossier passport contient la configuration du module "passport" permettant de paramétrer une authentification jwt
* Le dossier swaggerUi comprend essentiellment notre swagger, soit une documentation intéractive de l'api


## API

Pour accéder à la documentation de l'api il faut se rendre à l'adresse suivante : http://localhost:3001/api-docs/  ( ou en prod : http://api.gustosolutions.fr/api-docs/).
On accède alors à l'ensemble des routes créées ainsi que les paramètres s'y rattachant.

Afin de tester les différentes routes, il est possible de le faire depuis swagger directement ou alors de renseigner l'url http://localhost:3001/api/... en local 
ou http://api.gustosolutions.fr/api/... en production

Afin d'effectuer les différents test il est fortement conseillé d'utiliser Postman logiciel permettant d'appeler des reqêtes API facilement : https://www.postman.com/downloads/


