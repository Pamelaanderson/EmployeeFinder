const path = require('path');

//export a function
// survey is top bc read top to bottom
module.exports = function(app) {
    app.get('/survey', function(req, res) {
        res.sendFile(path.join(__dirname, '/../public/survey.html'));
    });
    //* catches anyting that isnt survey or defined routes
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '/../public/home.html'));
    });
};