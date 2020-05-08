/* renders choose-team.html */
function renderChooseTeam() {

    /* fetch all the current teams */
    fetch("http://localhost:8080/api/team/getAll").then(response => response.json())
        .then(teams => {

            // for each team 
            teams.forEach(function(team) {
                teamOption = $('<option></option>', { value: team.teamid, text: team.teamname }); // create an option
                $('#team-dropdown').append(teamOption); // append the option
            });

            chooseTeamFunctionality(); // add functionality
        });
}