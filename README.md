# Gusto Front 
***
## Setup app

Lors de l'ouverture du code de la branche front faite la commmande npm install afin d'installer l'ensemble des dépendances puis lancer l'app avec npm start à la racine du projet. Rendez-vous ensuite sur l'adresse suivante : http://localhost:3000/ afin de visualiser le visuel client de l'app en local.

## Mise en production 

Afin de mettre en production la partie front du projet, il est nécessaire d'éffectué un build de l'app avec la commande : npm run build à la racine du dossier. Ensuite, pour envoyer le build sur l'hébergement tapez la commande : scp -P 41149 -r build  gustoss@sshcloud.cluster024.hosting.ovh.net:~/app. 
Vous pouvez ensuite vous rendre sur l'adresse http://app.gustosolutions.fr/ pour avoir la version en production de l'app.

## Architecture 

Le dossier page renseigne toute les pages existante sur l'app. 
Le dossier Components renseigne toute les fonctionalités de l'app avec 1 dossier par fonctionnalité ainsi chaque page possède un dossier atitré dans components.

![image](https://user-images.githubusercontent.com/65896884/148081713-4f3f01c7-4ea4-4caf-9888-72b527f17136.png)
![image](https://user-images.githubusercontent.com/65896884/148081854-4bd27fd9-2a73-4d90-a60c-86ce796cc2cb.png)
![image](https://user-images.githubusercontent.com/65896884/148081940-5a68735f-b79b-407e-a2c7-ed03f437cf74.png)




## Fonctionalités inachevés 

Setup de la librairie Chart.js permettant de faire des graphiquues en js. Cela permettrai de d'informer le clients de ses ventes dans un format plus visuel qui serait fficher sur la page d'accueil.

Setup de l'upload d'image coté front cette fonctionalité fonctionne en local mais pas en production.






