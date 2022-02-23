Projet 7 groupomania - Création d'un réseau social d'entreprise.

Mise en place de l'application :

Créer une base de donnée mysql, un utilisateur et un mot de passe, puis rentrez ces élements dans le fichier .env, à l'emplacement prévu.

BACKEND

pour lancer le backend, après vous être déplacé dans le dossier, tapez npm install, puis nodemon server.

FRONTEND

tapez npm install puis npm run serve avec node v16

et rendez-vous ici : http://localhost:8080/

Droit administrateur

pour tester les fonctionnalités admin, tapez dans la ligne de commande mysql : update Users set isAdmin = '1' where id = (l'utilisateur que vous préferez, par défaut 1); puis reconnectez-vous avec cette utilisateur à l'application.