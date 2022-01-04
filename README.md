# Gusto Front 

## Setup app

Lors de l'ouverture du code de la branche front faite la commmande npm install afin d'installer l'ensemble des dépendances puis lancer l'app avec npm start à la racine du projet. Rendez-vous ensuite sur l'adresse suivante : http://localhost:3000/ afin de visualiser le visuel client de l'app en local.

## Mise en production 

Afin de mettre en production la partie front du projet, il est nécessaire d'éffectué un build de l'app avec la commande : npm run build à la racine du dossier. Ensuite, pour envoyer le build sur l'hébergement tapez la commande : scp -P 41149 -r build  gustoss@sshcloud.cluster024.hosting.ovh.net:~/app. 
Vous pouvez ensuite vous rendre sur l'adresse http://app.gustosolutions.fr/ pour avoir la version en production de l'app.

