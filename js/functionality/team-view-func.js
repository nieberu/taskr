/* functionality for team-view */
function teamViewFunctionality(teamid) {

    /* create a new member upon user pressing enter */
    $("#new-member-card").on("keypress", "#new-member-input", function(e) {
        if (e.which == 13) {

            // get member name from input
            let newMemberName = $(this).val();
            $(this).val('');

            // create team member
            fetch("http://localhost:8080/api/teammember/create?availability=true&name=" + newMemberName.replace(' ', '%20'), { method: "POST" })
                .then(response => response.json())
                .then(member => {
                    // assign the team member 
                    fetch("http://localhost:8080/api/teammember/add/" + member.teammemberid + "/team?team=" + teamid, { method: 'POST' })
                        .then(response => response.json())
                        .then(member => {
                            $('#new-member-card').before(createTeamMemberCard(member.name, member.teammemberid));
                            $('.person-link').each(addProfileLink);
                        });
                });
        }
    });


    /* take the preson to profile view when clicking on their name */
    $('.person-link').each(addProfileLink);

    /* click to change status */
    $('.card-header').on('click', '.status', function() { toggleStatus(this) });

    /* team-view-button functionality */
    $('#team-view-link').attr('href', location.href);
}

/* callback function to add the correct profile-view links to each team member card */
function addProfileLink() {

    // get the member id from the card id, and create the new link
    let memberid = $(this).parent().parent().attr('id');
    let newLink = location.href.replace('team-view', 'profile-view') + "&memberid=" + memberid;
    $(this).attr('href', newLink);
}