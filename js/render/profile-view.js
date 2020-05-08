/* renders profile-view.html */
function renderProfileView(teamid, memberid) {

    /* display the team name in the header */
    fetch("http://localhost:8080/api/team/" + teamid).then(response => response.json()).then(team => {
        $('#team-name').text(team.teamname);
    });

    /* update the member name in the person header */
    fetch("http://localhost:8080/api/teammember/" + memberid).then(response => response.json()).then(member => {
        $('#person-label').text(member.name);
    });

    /* fetch the current tasks from the database, display them, and add functionality for buttons */
    fetch("http://localhost:8080/api/teammember/" + memberid + "/getTasks").then(response => response.json()).then(tasks => {
        updateProfileView(tasks); // display all the member's tasks 
        profileViewFunctionality(teamid, memberid); // add functionality for the buttons;
    });
}

/* given a list of tasks, display them into profile-view */
function updateProfileView(tasks) {

    // for each task
    tasks.forEach(task => {

        let taskDiv = createTaskDiv(task) // make the div for the task

        // add the taskDiv to the appropriate category
        if (task.status == false) $('#completed').append(taskDiv)
        else if (task.startDate === task.endDate) $('#daily').append(taskDiv);
        else $('#weekly').append(taskDiv);
    });
}