module.exports = {
 getFilterQuery: function(request){
   var rtnString ="";
    if(!!request.mealtime ){
      switch(request.mealtime){
        case "Frukost":
          rtnString += " AND is_Breakfast = 1";
          break;
        case "Huvudrätt":
          rtnString += "AND is_Maincourse = 1"
          break;
        case "Middag":
          rtnString += "AND is_Dinner = 1"
          break;
        case "Efterrätt":
          rtnString += "AND is_Desert = 1"
          break;
      }
    }

    if(!!request.diet){
        switch(request.diet){
          case "Vegan":
            rtnString += " AND is_Vegan = 1";
            break;
          case "Glutenfri":
            rtnString += " AND is_Glutenfree = 1";
            break;
          case "Vegterainsk":
            rtnString += " AND is_Vegetarian = 1";
            break;
          case "Laktosfri":
            rtnString += " AND is_Lactosefree = 1";
            break;
        }
    }

      if(!!request.time){
        console.log("Time: " + request.time)
        switch(request.time){
          case "Under 15min":
            rtnString += " AND time_duration = 15";
            break;
          case "Under 30min":
            rtnString += " AND time_duration <= 30 ";
            break;
          case "Under 45min":
            rtnString += " AND time_duration <= 45";
            break;
          case "Under 60min":
            rtnString += " AND time_duration <= 60";
            break;
          case "Över 60min":
            rtnString += " AND time_duration = 61 ";
            break;
        }
      }

      if(!!request.grade){
        console.log("grade: " + request.grade)
        switch(request.grade){
          case "Mindre än 3":
            rtnString += " AND rating <= 3";
            break;
          case "Mindre än 4":
            rtnString += " AND rating <= 4";
            break;
          case "Högre än 4":
            rtnString += " AND rating >= 4";
            break;
          case "5 sjärnor":
            rtnString += " AND rating = 5";
            break;
        }
      }

      if(!!request.kcal){
        switch(request.kcal){
          case "Under 200 kcal":
            rtnString += " AND kcal <= 200";
            break;
          case "Under 500 kcal":
            rtnString += " AND kcal <= 500";
            break;
          case "Under 1000 kcal":
            rtnString += " AND kcal <= 1000";
            break;
        }
      }

      if(request.climateSmart){
        rtnString += " AND is_ClimateSmart = 1 ";
      }

      return rtnString;



  }
};
