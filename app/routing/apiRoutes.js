const employees = require('../data/employees');

module.exports = function(app) {
    app.get('./api/employees', function(req,res) {
        res.json(employees);
    });

    app.post('./api/employees', function(req, res) {
        const bestMatch = {
            name: '',
            photo: '',
            employeeDifference: Infinity
        };
        const userData = req.body;
        const userScores = userData.scores;

        let totalDifference;

        for (let i = 0; i < employees.length; i++) {
            const currentEmployee = employees[i];
            totalDifference = 0;

            for (let j = 0; j < currentEmployee.scores.length; j++) {
                const currentEmployeeScore = currentEmployee.scores[j];
                const currentUserScore = userScores[j];

                totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentEmployeeScore));
            }
        }
        if (totalDifference <= bestMatch.employeeDifference) {
            bestMatch.name = currentEmployee.name;
            bestMatch.photo = currentEmployee.photo;
            bestMatch.employeeDifferent = totalDifference;
        }
    })
    console.log(bestMatch);
    employees.push(userData);
    
};