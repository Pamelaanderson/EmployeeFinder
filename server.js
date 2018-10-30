//allows us to use api request and routing package
const express = require('express');
//provides the utilities to work with files and path
const path = require('path');

//express appliction
const app = express();

//port variable
const PORT = process.env.PORT || 8080;

//middle wear to interperate data (easier for server)
app.use(express.urlencoded({ exxtended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'app/public')));

//require the files app= used to handle requests
require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

//start server and have it listen at port
app.listen(PORT, function() {
    console.log(`App listening on PORT: ${PORT}`);
});