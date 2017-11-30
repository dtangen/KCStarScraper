var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/kcnews", function(error)
    {if(error) throw error;
    console.log("Database connected");
});