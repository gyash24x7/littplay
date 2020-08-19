# Literature

Literature or Canadian Fish is a 6 player card game, played in teams of 3. The aim of the game is to score as many half sets as possible. The team that scores more half sets wins. 
There are two half sets for each suits making a total of 8 sets. 

Small Set - Ace, Two, Three, Four, Five and Six

Big Set - Eight, Nine, Ten, Jack, Queen and King.

The team players ask the opposite team players for a particular card, provided they have a card from the same half set. The player can keep asking for cards until someone denies that they don't have that card. Then, the chance is transferred to that player.


## Project Structure

This repo is a monorepo created using yarn workspaces. The client directory is an **Ionic React** project handling all the client side of the code. It contains the android and ios counterparts of the ionic project. The server directory is a **NestJS** Project handling all the server side code. It also serves the client static build for the web version of the game.


## Tech Stack

#### NestJS, MongoDB, GraphQL, React, Ionic


## Commands

#### Clone the Repository 
`git clone https://github.com/gyash24x7`

#### Install ionic cli globally 
`yarn global add ionic-cli`

#### Install the dependencies 
`yarn`

#### Run the development server 
`yarn dev:server`

#### Run the development client 
`yarn dev:client`

#### Build static build of client to be served by the server
`yarn build:client`

#### Build production build of server
`yarn build:server`

#### Open iOS project in xcode

Copy JS Bundle:  `ionic cap copy ios`

Copy Capacitor Plugins: `ionic cap sync ios`

Open Project: `ionic cap open ios`

#### Open Android project in Android Studio : 

Copy JS Bundle:  `ionic cap copy android`

Copy Capacitor Plugins: `ionic cap sync android`

Open Project: `ionic cap open android`

##### You can build and test android and ios projects separately using respective IDEs
