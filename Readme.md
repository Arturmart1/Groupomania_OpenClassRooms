# Projet 7 - Groupomania, création d'un réseau social d'entreprise

7ème et dernier projet du parcours développeur web d'Openclassrooms.
Création un réseau social d'entreprise.

## Technologies utilisées
- VueJs + Vue router + Vue CLI
- NodeJs + express + sequelize
- Mysql(MariaDB)

## Mise en place du projet
La base de données utilisée pour le développement est hebergée sur un serveur distant. Vous pouvez vous y connecter en utilisant les identifiants fournis dans le fichier ".env".
Vous pouver aussi créer une base de données en local. Pour ce faire, vous devez : 
- Créer une base de données mySQL
- Créer un utilisateur et un mot de passe
- Entrer ces informations dans le fichier ".env" aux emplacements prévus
## Déploiement et lancement du Frontend

Ouvrir le dossier Frontend dans le terminal de votre éditeur puis exécuter la commande:

    npm install

puis

    npm run serve

puis rendez-vous à cette adresse:

- http://localhost:8080/

## Déploiement et lancement du Backend

Ouvrir le dossier Backend dans le terminal de votre éditeur puis exécuter la commande:

    npm install

puis

    nodemon server

## Droit administrateur
Un compte administrateur à été créé sur la base de données distante, voici les identifiants :
email: admin@groupomania.com
password: QRncgF+D7m*?!G9R  

Dans le cadre de l'utilisation d'une base de données locale, pour tester les fonctionnalités admin, tapez dans la ligne de commande mysql : update Users set isAdmin = '1' where id = (l'utilisateur que vous préferez, par défaut 1); puis reconnectez-vous avec cette utilisateur à l'application.
## Utilisation

Pour s'inscrire sur le social network de Groupomania, il vous faut renseigner :

- Votre nom et prénom (minimum 2 caractères)
- Une adresse mail valide
- Un mot de passe (de 8 à 20 caractères, lettres, chiffreset symboles acceptés, majuscules et minuscules).
  Vous pouvez par la suite modifier votre profil (Nom, prénom, photo) en allant sur votre profil. Votre compte peut être supprimé par vous-même ainsi que par l'administrateur.

Une fois connecté vous pouvez voir les publications des utilisateurs et publier au choix:

- un statut
- un statut + une image (Jpg, Png, Gif)

## Erreur possibles

Dans le cadre d'un deploiment sous linux, node v17 présentant des dysfonctionnements sur ce sytème d'éxploitation, vous devez lancer le front-end avec la version 16.