# API [![Backend](https://github.com/kh42z/p42ng/actions/workflows/workflow.yml/badge.svg)](https://github.com/kh42z/p42ng/actions/workflows/workflow.yml) [![Coverage Status](https://coveralls.io/repos/github/kh42z/p42ng/badge.svg?branch=master&t=t8ICMV)](https://coveralls.io/github/kh42z/p42ng?branch=master)

## Post Mortem

### SPECS

Le point de depart a ete la conception du schema de la base de donnees (dbdiagram.io). 

Puis pour decrire le comportement de notre API nous avons opte pour Swagger. Swagger a fait office de Spec en nous permettant de decrire ce qui est consomme par le front et produit par notre API.

#### DEV PROCESS

#### 1. Linting 
Nous avons choisi de mettre en place un linter pour gagner en lisibilite, coherence et en qualite de code. (`rubocop`)

#### 2. Tests

Le `TDD` faisant partie integrante de Rails, il m'etait impossible de passer a cote. Nous avons mis en place le processus suivant:
- decrire le fonctionnement attendue de l'api (`swagger`)
- generer le squelette des `models`/`controllers`/`rspec`
- ecrire la factory puis les tests (`factory-bot`/`rspec`/`shoulda-matcher`) 
- ecrire la migration, les contraintes du modele, les methodes du controller, la route
- eventuellement refactor

#### 3. CI/CD

Un github workflow se declenchait sur chaque `push` sur `master`, si le rubocop/tests passaient la version etait deployee sur une instance d'Heroku en mode production.

### CONCLUSION

Il y a eue beaucoup de monter en competence sur des sujets tres varies (`Ruby`, `Rest`, `Websocket`, `Oauth2`, `JWT`, `MVC`) et decouvrir la majorite des features de Rails (`ActiveStorage`, `Caching`, `ActiveJob`, `ActionCable`, etc) mais l'interet principal de ce project restera pour moi la mise en place du `TDD`.

Je ne regrette pas d'avoir investi du temps dans sa mise en place et "evangelisation". Cependant a l'avenir je ne l'utiliserais que pour tester le [comportement](https://www.youtube.com/watch?v=EZ05e7EMOLM), tester l'implementation a tendance a dissuader tout refactor (...).

## Run:
`docker-compose up --build`

## OpenAPI Documentation

http://localhost:3000/api-docs

## Rails Tests:

`docker exec -ti pong rspec`

### Authors:

@kh42z, @Shankhara
