# TeamCoolGuyFront
Front end repository for TeamCoolGuy's trading card game inventory managment system also known as TCG'sTCGIMS.

Our project is a trading card game inventory management system. Often times when meeting people to play cards they may ask you things like
"I'm looking for this card, do you have it?" or "I'm looking to trade this card do you need it?" and I answer them with "Hell if I know,
I don't carry around my entire collection with me". What would be really helpful is if I had an app that I could use to manage my
collection from my computer at home, view and show my collection on my phone when I'm out, and purchase or trade cards from anywhere.
That's where TCG's .tm &copy TradingCardGame IMS come in handy.

Our app comes with two roles, the primary user role or "players" and the "store owner" role. The player role is our primary target
audience and where most of the functionality comes in. Players are able to manage their collection by registering as a user and logging in.
Once they have, they can add or remove cards from their collection and have access to their collection from any device. This allows players
to show their collections to each other and facilitates trades. Store owners behave slightly differently. While they can also manage a
collection or "inventory" in this case, they do so with the purpose of selling these cards. Players can then views these store's inventories to make purchases from them. 

The backend of the application will handle a few things. First will be authentication and registration. Things like making sure a username doesn't already exist when trying to create a new user and checking that a user's password is correct when logging in. It will handle retrieving data from any api's that we may use like getting a card's stats or an image for the card. The backend will also deal with updating and retrieving information from the database. The front end will be left with the responsibilty of displaying the UI. There will be pages for collection management, and a page for viewing storefronts to buy store owners cards. There will even be a page to facilitate trades between players with a messaging system included.

It is my hope that this system can alleviate the burden of card collection archiving/management from players who love of the game is as big as thier collection.