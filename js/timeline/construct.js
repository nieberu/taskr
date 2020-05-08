/* This JS script reformats the csv object to be compatible with the TimelineJS library. 
   The user-inputted CSV is of the same format as the template google spreadsheet given in TimelineJS. The script starts by calling
   reformat() from another script.

    template Google Spreadsheet/CSV: https://docs.google.com/spreadsheets/d/1pHBvXN7nmGkiG8uQSUB82eNlnL8xHu6kydzH_-eguHQ/copy

    We restructure the CSV object into a JSON according to these rules:

    rules: https://timeline.knightlab.com/docs/json-format.html#json-text  */


// reformats csv objects into timeline objects
function reformat(csvObj) {

    // timeline json object
    timelineJson = { "events": [], "title": null, "eras": [], scale: null };

    // process each row
    csvObj.forEach(timelineBuilder);

    // log the final timeline
    // console.log(timelineJson);

    return timelineJson;
}

// takes a row from the csv and makes either an event, a title, or an era
function timelineBuilder(row) {


    // row is an event type - add it to the list of events
    if (row["Type"] === "") {
        timelineJson.events.push(slideCreator(row));
    }

    // row is title type - make it the title slide
    else if (row["Type"] === "title") {
        timelineJson.title = slideCreator(row);
    }

    // row is an eras type - add it to list of eras
    else if (row["Type"] === "eras") {
        timelineJson.eras.push(eraCreator(row));
    }
}

// create a slide from a row in the csv
function slideCreator(row) {

    // get the start_date and end_date JS objects
    [start_date, end_date] = createDateObjects(row);

    // make the text object
    text = {
        "headline": row["Headline"],
        "text": row["Text"]
    };

    // make them media object
    media = {
        "url": row["Media"],
        "caption": row["Media Caption"],
        "credit": row["Media Credit"],
        "thumbnail": row["Media Thumbnail"]
    };

    // make the group, display_date, and background objects
    group = row["Group"];
    display_date = row["Display Date"];
    background = row["Background"];


    // return the slide object     
    return { "start_date": start_date, "end_date": end_date, "text": text, "media": media, "group": group, "display_date": display_date, "background": background };
}

// create an era from a row in the csv
function eraCreator(row) {

    // get the start_date and end_date JS objects
    [start_date, end_date] = createDateObjects(row);

    // make the text object
    text = {
        "headline": row["Headline"],
        "text": row["Text"]
    };
}

// create the start and ending date objects from a row in the csv
function createDateObjects(row) {


    // make the start_date object
    start_date = {
        "year": row["Year"],
        "month": row["Month"],
        "day": row["Day"],
        "hour": parseInt(row["Time"].substring(0, 2)).toString(),
        "minute": parseInt(row["Time"].substring(3, 5)).toString(),
        "second": parseInt(row["Time"].substring(6, 8)).toString()
    };

    // make the end_date object
    end_date = {
        "year": row["End Year"],
        "month": row["End Month"],
        "day": row["End Day"],
        "hour": parseInt(row["End Time"].substring(0, 2)).toString(),
        "minute": parseInt(row["End Time"].substring(3, 5)).toString(),
        "second": parseInt(row["End Time"].substring(6, 8)).toString()
    };

    // get rid of the NaNs because those don't allow the timeline to be created
    start_date = getRidOfNaNs(start_date);
    end_date = getRidOfNaNs(end_date);

    return [start_date, end_date];
}

// get rid of NaNs 
function getRidOfNaNs(date) {

    // change each property of the date object to "" if it's NaN
    Object.keys(date).forEach((key) => {
        if (isNaN(date[key])) date[key] = "";
    });

    return date;
}