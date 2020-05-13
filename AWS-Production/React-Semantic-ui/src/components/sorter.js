module.exports = {
 sorter: function(results, ingredients){
   var objectRet = { results: []  };
   	if ( Object.size(results)) {
      results.data.map( result => {
        var recipeItem = {
           Name: result.Name,
           IMG_URL: result.IMG_URL,
           Rating: result.rating,
           URL: result.URL,
           IngredientsMissing: [],
           IngredientsMatches: [],
           missingCount: 0
         };

        var keys = Object.keys(ingredients.items);
        var ingredientSplit = result.Ingredients.split(",");
        var missingCount = 0;
        var missing = true;
          ingredientSplit.map(ingredientItem => {
              ingredients.items.map(curIngredient => {
                 missing = true;
                if(ingredientItem.includes(curIngredient)){
                      missing = false;
                      recipeItem.IngredientsMatches.push(ingredientItem);
                    };
                    }
                  )

                  if(missing){
                    recipeItem.IngredientsMissing.push(ingredientItem);
                    recipeItem.missingCount += 1;
                  }
            });
            objectRet.results.push(recipeItem);
        }
      )
      }
      objectRet.results.sort(function(a, b){return b.IngredientsMatches.length - a.IngredientsMatches.length} )
      return objectRet;
    }
 }
