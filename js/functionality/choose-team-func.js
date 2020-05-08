/* functionality for choose-team */
function chooseTeamFunctionality() {

    /* create a new team if the user wishes */
    $('#main').on("keypress", "#new-team", function(e) {
        if (e.which == 13) {

            let newTeamName = $(this).val(); // get the new team name
            $(this).val(''); // clear the input

            // post to create the new team
            fetch('http://localhost:8080/api/team/create?name=' + newTeamName, { method: "POST" }).then(response => response.json())
                .then(team => {

                    // create the new team option 
                    teamOption = $('<option></option>', { value: team.teamid, text: team.teamname });
                    $('#team-dropdown').append(teamOption);
                });
        }
    });
}