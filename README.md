This project is all about refactoring code from Adobe XD Mobile Experience Design. 

Taskr is a organizational tool where teams, members, and tasks can be created and their statuses can be updated.

## Setting it up
- First, run the Spring Boot service taskr-service, which communicates with our front end.
- If you're runnning it locally, for now, you need to disable the same origin policy to let the
    front and backend communicate, just enable the Google Chrome addon:
    https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en

- This front end code also needs to be hosted on a server. If you have VS Code there's several extensions that let you do this easily (ex. Live Server).

# How to use Taskr 

## choose-team.html

- The starting point is choose-team.html, where users can select the team they currently belong to, or create a new team

## team-view.html
- After selecting a team, the user is brought to team-view.html, with a URL parameter indicating their team id
-  Users can view all the daily tasks of team members, as well as manipulate everyone's availability status

- Users can also add team members, and click the names of members to take them to an individualized profile-view - called profile-view.html

## profile-view.html

- In profile-view.html, users can see all the assigned tasks for a person, partitioned into 3 cards Daily, Weekly, and Completed
- If a task is in Daily or Weekly, the user can change the status of the task to "need help", and/or "completed" by clicking the corresponding icons
- If the checkmark is pressed, the task will move to the Completed card
- The member's availiblity can also be toggled
- The user can create a new task by pressing the + symbol

# The code

## html
- the 3 html pages without JS are templates without any content
- inspect elements on the pages to examine the divs: header, main, nav, and div
- team-view.html and profile-view.html have cards, tasks, and others
- the script tags at the bottom call the render function and fill the page with appropriate content
 
## css
- main.css has decent documentation
- choose-team.css has css specific to choose-team.html

## js
- all data is fetched from the backend, and posted to the backend 
- typically, data is posted and then the response is used to update the UI
- ex. if a new member is specfied by the user, a post request is given to the backend, and the   new member is returned, and the new member card is created using that response
- the files in the render folder are called when the page loads to get data from the backend
- the files in the functionality folder configure the buttons and links, and post data to backend
    whenever something changes
