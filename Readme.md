# Rate This Game

### Overview

This application is a full stack app where the user scrapes data from "Armor Games" website and use this data to write a review and give a rating.

The app is organized by MVC pattern, the server is running on Heroku platform and the database is on MongoDB.

### How does it work?

When entering the URL the information from the database is being shown to the user in a list.

The user can press the "UPDATED LIST" button to get all the new games from the "Armor Games" website or press the title to add a rating and review.

When pressing on the title to add a rating/review -an input box will appear to the right and the user can add those states. The information will be added to the database.

### Why does it useful?

This app demonstrates:
1. The use of scraping data with "axios" and "cheerio" packages.
2. Creating and Finding data from the MongoDB database using "Mongoose" package.
3. Using an "express" and "bodyParser" packages for the server.
4. Having the files organized in MVC pattern.