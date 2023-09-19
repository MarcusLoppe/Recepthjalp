Recipe Lookup - Reduce Food Waste with IT
Description
![Front page](https://github.com/MarcusLoppe/Recepthjalp/blob/master/img/Demo.PNG)
Recipe Lookup is a project designed to help users reduce food waste by finding recipes based on the ingredients they have at home. Users can input ingredients, which are then added to a list. They can also apply various filter parameters to refine their search in the database. This project was developed as a group assignment for a university paper on resolving societal issues using IT.
Features

    Ingredient Input: Add ingredients you have at home to get recipe suggestions.
    Filter Options: Refine your search based on:
        Meal Type (Breakfast, Main Course, Dinner, Dessert)
        Diet (Vegan, Gluten-free, Vegetarian, Lactose-free)
        Cooking Time
        Grade
        Caloric Content (kcal)
        Climate Smart (Low CO2)

Data Collection

The recipe data was legally collected by scraping various recipe websites. When a user clicks on a recipe, they are redirected to the original site for the full recipe. The scraping script used for data collection can be found in the GitHub repository.
Database Schema

The main table in the database is the Recipe table with the following columns:

    recipeID
    Name
    URL
    IMG_URL
    FullDesc
    Ingredients
    time_duration
    rating
    rating_num
    kcal
    is_Breakfast
    is_Maincourse
    is_Dinner
    is_Desert
    is_Vegan
    is_Glutenfree
    is_Vegetarian
    is_ClimateSmart
    is_Lactosefree

Libraries and Technologies Used

    Backend: Node.js
    Frontend: React-Semantic-UI
    Database: sqlite3 (connected to a local .db file)
 
Source Code Overview
init.js

This file initializes the express app, sets up the server, and defines the main API endpoint for fetching recipes based on user input and filters. It also handles CORS and serves the frontend built with React-Semantic-UI.
dbserver.js

This file sets up the SQLite3 database connection and exports the database object for use in other parts of the application. 
License

This project is open-source and available under the MIT License. However, please ensure to respect the terms of use of the websites from which the recipe data was scraped.
Acknowledgements

This project was developed as part of a group assignment at University of Skövde (Högskolan i Skövde). We'd like to thank our professors and peers for their feedback and support.
