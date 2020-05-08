/* Adds event listeners to the page for functionality! */

/* let users click to change status */
function toggleStatus(statusSpan, memberid = "") {

    /* if we're not specifying a memberid, it means we're in team view, so we get the member id
        from the id of the div */
    if (memberid === "") {
        memberid = $(statusSpan).parent().parent().attr('id');
    }

    // newAvailability is the opposite of the current a
    let newAvailability = !($(statusSpan).text() === "available");

    /* POST the member's new availability  on backend */
    fetch('http://localhost:8080/api/teammember/update/' + memberid + '?availability=' + newAvailability, { method: "POST" }).then(member => member.json())
        .then(member => {

            // reflect the members new availibility on the UI 
            if (member.availability) {
                $(statusSpan).text('available');
            } else $(statusSpan).text('not available');
        });
}



/* change the help icon */
function toggleHelp() {

    // the task div contianing the pressed checkmark icon
    let taskDiv = $(this).parent();

    // fetch the task's current help by using the id of the taskDiv
    fetch('http://localhost:8080/api/task/' + taskDiv.attr('id')).then(task => task.json())
        .then(task => {

            // post the task's new help as opposite of the current help            
            fetch('http://localhost:8080/api/task/updateHelp/' + task.taskid + '?help=' + !(task.help), { method: "POST" }).then(task => task.json())
                .then(task => {

                    // remove the current help icon, and add the new icon corresponding to updated help and status
                    taskDiv.find('.help-icon').remove();
                    taskDiv.append(createHelpSVG(task.help, task.status));
                });
        });

}