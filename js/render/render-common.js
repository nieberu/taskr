/*
   This program renders choose-team.html, team-view.html, and profile-view.html 
*/

/*  creates and returns a task div (a horizontal container for the task description and status SVGs) */
function createTaskDiv(task) {

    let taskDiv = $('<div/>', { class: 'task flex', id: task.taskid }) // contains the entire div for the task

    // create the SVGs by using the status of the tasks
    let taskDescriptionSpan = createTaskDescription(task.description);
    let checkmarkSVG = createCheckMarkSVG();
    let helpSVG = createHelpSVG(task.help, task.status);

    // add all the elements
    taskDiv.append(taskDescriptionSpan, checkmarkSVG, helpSVG);

    return taskDiv;
}

/* creates a new span containing the task description, and adds the appropriate classes */
function createTaskDescription(taskDesc) {

    // create the text span and add class
    let taskText = $("<span>" + taskDesc + "</span>");
    taskText.addClass('task-description');

    return taskText;

}

/* creates a new SVG containing the check mark icon (use vanilla JS instead of jQuery for SVGs) 
   when the checkmark is toggled, it's moved to the completed card, and CSS hides it
*/
function createCheckMarkSVG() {

    // create the svg
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    // create the use element and add the href
    let checkmark = document.createElementNS("http://www.w3.org/2000/svg", "use")
    checkmark.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '../css/taskr.svg#checkmark-icon');

    // append
    svg.appendChild(checkmark);

    svg.classList.add('checkmark-icon');
    svg.classList.add('shadow');

    return svg;
}

/*  creates a new SVG containing the help icon, and an empty SVG if the task doesn't need (and never needed) help 
    - vanilla JS instead of jQuery are used for SVG
    - a new helpSVG is created every time help is toggled or moved to completed card
    - not controlled by CSS
*/
function createHelpSVG(needHelp, status) {

    // create the svg
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    // create the use element
    let helpSymbol = document.createElementNS("http://www.w3.org/2000/svg", "use");

    if (!needHelp && !status) {} else {
        // choose the right symbolID and add it
        symbolID = (needHelp ? 'help-icon-red' : 'help-icon-gray');
        if (!status) symbolID = 'help-icon-completed'

        helpSymbol.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '../css/taskr.svg#' + symbolID);
    }

    /* append the help symbol and add classes */
    svg.appendChild(helpSymbol);
    svg.classList.add('help-icon');
    svg.classList.add('shadow');

    return svg;
}

/* create the span which says available or not available */
function createStatus() {
    return $('<span/>', { class: 'status', text: 'available' });
}