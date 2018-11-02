$(function() {
    const validateForm = function() {
        let isValid = true;

        //we ask jquery for a nodelist of inputs
        //we iterate over nodelist of inputs
        // we evaluate if input.val is...

        
    $('input').each(function() {
            if( $(this).val() === '' ) {
                isValid = false;
            }
        });
        return isValid;
    }
    const displayModal = function(data) {
 // Grab the result from the AJAX post so that the best match's name and photo are displayed.
        $('#match-name').text(data.name);
        $('#match-img').attr('src', data.photo);

// toggles the modal from display 
        $('#results-modal').modal('toggle');
    }
    const submit = function(e) {
        e.preventDefault();
        console.log('clicked submit');
        if(validateForm()) {
            const userData = {
                name: $('#name').val().trim(),
                photo: $('#photo').val().trim(),
                scores: [
                    $('#q1').val(),
                    $('#q2').val(),
                    $('#q3').val(),  
                    $('#q4').val(),
                    $('#q5').val(),
                    $('#q6').val(),
                    $('#q7').val(),
                    $('#q8').val(),
                    $('#q9').val(),
                    $('#q10').val(),


                ]
            };

            $.post('/api/employees', userData, function(data) {
                // Grab the result from the AJAX post so that the best match's name and photo are displayed.
                       $('#match-name').text(data.name);
                       $('#match-img').attr('src', data.photo);
               
               // toggles the modal from display 
                       $('#results-modal').modal('toggle');
                   });
        } else {
            $('#error')
            .text('Please fill out all fields before submitting!')
            .addClass('alert alert-danger');
        }
      
    }
      $('#submit').on('click', submit);
});