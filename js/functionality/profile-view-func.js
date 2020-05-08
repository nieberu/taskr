/* functionality for profile-view */
function profileViewFunctionality(teamid, memberid) {

    /* when the daily plus icon is clicked, display an input bar to type new task */
    $('#main').on('click', '#daily .plus-icon', function() {
        $('#new-daily-task').toggle('hide show');
    });

    /* when the weekly plus icon is clicked, display an input bar to type new task */
    $('#main').on('click', '#weekly .plus-icon', function() {
        $('#new-weekly-task').toggle('hide show');
    })

    /* create a new task on pressing enter inside the new-task bars*/
    $('.card').on("keypress", "#new-daily-task, #new-weekly-task", function(e) {
        if (e.which == 13) {

            /* get the task text, clear the bar, and hide it */
            let desc = $(this).val();
            $(this).val('').toggle("hide show");

            /* get the dates and URL */
            daily = $('#daily').find($(this)).length > 0; // finds whether the plus button belonged to daily div or weekly div
            [start, end] = getURLFormattedDates(daily);
            let url = 'http://localhost:8080/api/task/create?description=' + desc + "&startDate=" + start + "&endDate=" + end + "&help=" + false + "&status=true";

            /* post the new task to backend */
            fetch(url, { method: "POST" }).then(response => response.json())
                .then(task => {
                    // post the new task to assign it to a member 
                    fetch("http://localhost:8080/api/task/add/" + task.taskid + "/teammember?tm=" + memberid, { method: 'POST' }).then(response => response.json())
                        .then(task => updateProfileView([task]));
                });
        }
    });

    /* click to change status */
    $('#person-header').on('click', '.status', function() { toggleStatus(this, memberid) });

    /* team-view button functionality */
    $('#team-view-link').attr('href', returnTeamLink());

    /* to attach event listeners to dynamically created objects, we use document as the selection */

    /* move to completed when checkmark is clicked */
    $(document).on('click', '.checkmark-icon', moveToCompleted);

    /* change help status */
    $(document).on('click', '.help-icon', toggleHelp);
}


/* returns the team-view link for a page in profile-view */
function returnTeamLink() {

    // replace profile-view-rendering.html with team-view-rendering.html and remove the member parameter 
    let newLink = location.href.replace('profile-view', 'team-view').split('&memberid=')[0];
    return newLink;
}

/* move a task to completed */
function moveToCompleted() {

    // the task div containing the pressed checkmark icon
    let taskDiv = $(this).parent();

    // post the task's new status as completed, using the id of the taskdiv
    fetch('http://localhost:8080/api/task/updateStatus/' + taskDiv.attr('id') + '?status=false', { method: "POST" }).then(task => task.json())
        .then(task => {

            // append the new taskDiv to completed
            $('#completed').append(taskDiv);

            // remove the help icon from the task-div
            taskDiv.find('.help-icon').remove();

            // add a new help icon corresponding to the updated task help and status
            taskDiv.append(createHelpSVG(task.help, task.status));
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

/* obtain the dates formatted for URL parameters */
function getURLFormattedDates(isDaily) {

    let [start, end] = [shortDate(), shortDate()];

    /* hard coded in 7 days time for a weekly task */
    if (!isDaily) {
        end = shortDate(7);
    }

    // replace / with %2F for URL encdoing
    start = start.replace("/", "%2F");
    end = end.replace("/", "%2F");

    return [start, end];
}

/* returns a new 'short date' string in the format MM/DD/YYYY, newDays in the future */
function shortDate(newDays = 0) {

    /* creates a date with (newDays) in the future from now */
    let date = new Date((new Date().getTime()) + (newDays * 24 * 60 * 60 * 1000));

    // current day (add leading zero if necessary)
    let day = date.getDate();
    if (day.length === 1) day = "0" + day;

    // current month (add 1 because it goes 0-11, and add leading 0)
    let month = (date.getMonth() + 1).toString();
    if (month.length == 1) month = "0" + month;

    // current year
    let year = date.getFullYear();

    // return date MM/DD/YYYY
    return month + "/" + day + "/" + year;
}