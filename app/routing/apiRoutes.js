const employees = require('../data/employee');

//export function using express app
// when get request it'll respond with a json list of employees
module.exports = function(app) {
    app.get('./api/employees', function(req,res) {
        res.json(employees);
    });
// cb func for when that route is hit
//object to hold the best match
    app.post('./api/employees', function(req, res) {
        const bestMatch = {
            name: '',
            photo: '',

            employeeDifference: Infinity
        };
        //takes the results of the user data and parse them
        const userData = req.body;
        const userScores = userData.scores;

// calc the user scores and the scores in each emp data
        let totalDifference;
// loop through each employee then loop through each of the scores of each emp then calc the absoulte difference in all of the scores and summed them into totalDifference
        for (let i = 0; i < employees.length; i++) {
            const currentEmployee = employees[i];
            totalDifference = 0;

            for (let j = 0; j < currentEmployee.scores.length; j++) {
                const currentEmployeeScore = currentEmployee.scores[j];
                const currentUserScore = userScores[j];

                totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentEmployeeScore));
            }
        }
        //comparison to the best match object from earlier
        //if total diff <= the current best match then we will update
        if (totalDifference <= bestMatch.employeeDifference) {
            bestMatch.name = currentEmployee.name;
            bestMatch.photo = currentEmployee.photo;
            bestMatch.employeeDifference = totalDifference;
        }
    })
    // console.log(bestMatch);
    // employees.push(userData);
    
};