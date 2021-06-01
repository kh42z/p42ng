# API [![Backend](https://github.com/kh42z/p42ng/actions/workflows/workflow.yml/badge.svg)](https://github.com/kh42z/p42ng/actions/workflows/workflow.yml) [![Coverage Status](https://coveralls.io/repos/github/kh42z/p42ng/badge.svg?branch=master&t=t8ICMV)](https://coveralls.io/github/kh42z/p42ng?branch=master)

## Post Mortem

### SPECS

Swagger a fait office de Spec nous permettant de decrire ce qui est consomme par le front et produit par notre API. Idealement le front/back pouvaient s'accorder sur le comportement de l'API avant son implementation.

   ![image](https://user-images.githubusercontent.com/60870254/120332312-eb436680-c2ee-11eb-9cd1-aafe11403ae4.png)
   
Pour avoir une visibilite sur l'implementation des modeles, le schema de la base a ete entierement decrit [(dbdiagram)](https://dbdiagram.io/):

![image](https://user-images.githubusercontent.com/60870254/120334875-4ece9380-c2f1-11eb-84e4-5d9d45d545fe.png)


### DEVELOPMENT

#### 1. Linting 
Nous avons choisi de mettre en place un linter pour gagner en lisibilite, coherence et en qualite de code. (`rubocop`)

#### 2. Tests

Le `TDD` faisant partie integrante de Rails, il m'etait impossible de passer a cote. Nous avons mis en place le processus suivant:
- decrire le comportement attendue de l'api (`swagger`)
- generer le squelette des `models`/`controllers`/`rspec`
- ecrire la factory puis les tests (`factory-bot`/`rspec`/`shoulda-matcher`) 
- ecrire la migration, les contraintes du modele, les methodes du controller, le serializer et la route
- si besoin refactor

#### 3. CI/CD

Un github workflow se declenchait sur chaque `push` sur `master`, si le rubocop/tests passaient la version etait deployee sur une instance d'Heroku en mode production.

### CONCLUSION

J'ai pu monter en competence sur des sujets tres varies (`Ruby`, `Rest`, `Websocket`, `Oauth2`, `JWT`, `MVC`) et decouvrir la majorite des features de Rails (`ActiveStorage`, `Caching`, `ActiveJob`, `ActionCable`, `Mailer`, etc) mais l'interet principal de ce project restera pour moi la mise en place du `TDD`.

Je ne regrette pas d'avoir investi du temps dans sa mise en place et son "evangelisation", le projet pourrait etre maintenu et etendu facilement sur la duree sans creer de dette technique. Cependant a l'avenir je ne l'utiliserais que pour tester le [comportement](https://www.youtube.com/watch?v=EZ05e7EMOLM) (`spec/requests`), garder les tests d'implementation a tendance a dissuader de refactor (...).

## Run:
`docker-compose up --build`

## OpenAPI Documentation

http://localhost:3000/api-docs

## Rails Tests:

`docker exec -ti pong rspec`

### Authors:

@kh42z, @Shankhara
