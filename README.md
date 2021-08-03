# TeamCoolGuy-Front

[Click here to view backend repository](https://github.com/210524training/TeamCoolGuyBackend)

Front end repository for TeamCoolGuy's trading card game inventory management system, also known as TC-Swap.

TC-Swap is a trading card game inventory management system. Our goal is to engage the diverse and vast community of collecting and trading cards. It can be challenging scouring the internet across many websites looking for the right card. Online trading can be a hassle as many websites do not offer services for such activities.  TC-Swap will solve this problem by providing a streamlined, focused platform centered around trading card enthusiasts where collectors, traders, and sellers of all different TCG's can engage in trades and sales. 

Through our application, we hope to build and unite the TCG community.

### Roles
TC-Swap caters to two roles, player and store-owner. As our app is focused on players, the majority of features are geared towards their needs. Users will need to register as players to gain the ability to log into the application. Once they have, they can begin to manage their card collection by adding, removing cards, and, most importantly, trade for cards with other players. Players can also show off their collections to other players, which will help build an incentive for trading. Store-owners behave slightly differently as they will manage their store inventory of cards to sell them to the players. Players can browse the different storefronts for cards they would like to purchase. 

### Application Layers
The backend of the application will handle a few things. First will be authentication and registration. Things like making sure a username doesn't already exist when trying to create a new user and checking that a user's password is correct when logging in. It will handle retrieving data from any APIs that we will use, for example, getting card stats and images from the Yu-Gi-Oh API. The backend will also deal with updating and retrieving information from the database. The front end will be left with the responsibility of displaying the UI. There will be a page to facilitate trades between players with a messaging system included. Other pages include tools for collection management and a page for purchasing cards from store owners. 
