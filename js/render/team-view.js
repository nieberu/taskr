/* renders team-view.html */
function renderTeamView(teamid) {

    /* fetch and display the team name in the header */
    fetch("http://localhost:8080/api/team/" + teamid).then(response => response.json()).then(team => {
        $('#team-name').text(team.teamname);
    });


    /* fetch and display everyone's daily tasks, and then add functionality for buttons */
    fetch('http://localhost:8080/api/team/' + teamid + "/getMembers").then(response => response.json()).then(members => {
        updateTeamView(members); // update everyones tasks from a list of members
        teamViewFunctionality(teamid); // add functionality for buttons
    });

}

/* given an array of members, display their daily tasks on team-view */
function updateTeamView(members) {

    // for each member
    members.forEach(member => {

        // create the member card
        let memberCard = createTeamMemberCard(member.name, member.teammemberid);

        // fetch the member's tasks
        fetch("http://localhost:8080/api/teammember/" + member.teammemberid + "/getTasks").then(response => response.json())
            .then(tasks => {

                // for each task
                tasks.forEach(task => {

                    // only append daily tasks
                    if (task.startDate === task.endDate) {

                        let taskDiv = createTaskDiv(task); // make the div for the task 
                        memberCard.append(taskDiv); // append the taskdiv
                    }
                });
            });

        $('#new-member-card').before(memberCard); // append the card before the 'add member' card at the bottom 
    });
}

/* return a new team card with the header formatted*/
function createTeamMemberCard(memberName, memberId) {

    /* link */
    let anchor = $('<a/>', { class: "person-link" });

    /* make the div and assign the id */
    let card = $('<div/>', { class: "card team-member", id: memberId });

    /* make the header */
    let header = $('<div/>', { class: "card-header" });

    header.append(anchor); // append the persons name
    $('<span/>', { class: "label", text: memberName }).appendTo(anchor);

    header.append(createStatus()); // append the status
    header.append('<hr>'); // append the horizontal rule
    card.append(header); // append the header

    return card;
}