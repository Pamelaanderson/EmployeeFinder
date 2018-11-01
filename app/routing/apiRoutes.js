const employees = require('../data/employee');

//export function using express app
// when get request it'll respond with a json list of employees
module.exports = function(app) {
    app.get('/api/employees', function(req,res) {
        console.log('all employees', employees);
        res.json(employees);
    });
// cb func for when that route is hit
//object to hold the best match

    app.post('/api/employees', function(req, res) {
        console.log('hit post route');
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
            let currentEmployee = employees[i];
            totalDifference = 0;

            for (let j = 0; j < currentEmployee.scores.length; j++) {
                const currentEmployeeScore = currentEmployee.scores[j];
                const currentUserScore = userScores[j];

                totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentEmployeeScore));
            }
            if (totalDifference <= bestMatch.employeeDifference) {
                bestMatch.name = currentEmployee.name;
                bestMatch.photo = currentEmployee.photo;
                bestMatch.employeeDifference = totalDifference;
            }
        }
        //comparison to the best match object from earlier
        //if total diff <= the current best match then we will update
         employees.push(userData);
         res.json(bestMatch);
    })
    // console.log(bestMatch);
   
    
};
// Determine the user's most compatible employee using the following as a guide:
// Convert each user's results into a simple array of numbers (ex: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]).
// With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the totalDifference.
// Example: 
// User 1: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]
// User 2: [3, 2, 6, 4, 5, 1, 2, 5, 4, 1]
// Total Difference: 2 + 1 + 2 = 5
// Remember to use the absolute value of the differences. Put another way: no negative solutions! Your app should calculate both 5-3 and 3-5 as 2, and so on. 
// The closest match will be the user with the least amount of difference.
// Once you've found the current user's most compatible employee, display the result as a modal pop-up.
// The modal should display both the name and picture of the closest match.