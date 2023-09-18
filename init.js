// Create express app
var express = require("express")
var app = express()
var db = require("./dbserver.js")
var filterFunc = require("./filter.js")

// Server port
var HTTP_PORT = 80
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.use(express.static(`${__dirname}/React-Semantic-ui/build`));

app.use(express.json());

 app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "http://localhost:80");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });
 
app.post("/api/recipe", (req, res, next) => {
  var sqlQuery = `select DISTINCT Recipe.RecipeID, Recipe.Name ,Recipe.Ingredients , Recipe.IMG_URL, Recipe.Rating, Recipe.URL
						from Recipe,RecipeContains, Ingredient
						where Recipe.RecipeID = RecipeContains.recipeID AND
						Ingredient.ingredientID = RecipeContains.ingredientID `;

  sqlQuery += filterFunc.getFilterQuery(req.body.filter);

  var keys = Object.keys( req.body.keywords );
  if(keys.length > 0 ) {
    sqlQuery += " order by ("
    for( var i = 0,length = keys.length; i < length; i++ ) {
          sqlQuery += "(ingredientName like '%" + req.body.keywords[ keys[ i ]] + "%') + "
    }
    sqlQuery = sqlQuery.slice(0,-2);
    sqlQuery += ") desc ";
  }
  sqlQuery +=  " LIMIT 0,30;";
  console.log("Full query: \n"+ sqlQuery + "\n");
    var params = []
    db.all(sqlQuery, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});


// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
