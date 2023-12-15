var currentDay = $("#currentDay");
var blockContainer = $(".container");
var blockTable = $("<table>")
blockContainer.append(blockTable);

// ** 1. Display the current day at the top of the calender when a user opens the planner. **
currentDay.text(dayjs().format("dddd[,]  MMMM D")) // Print the current day/month to currentDay <p>

// Array of objects to store timeblock properties
var timeblocks = [
    { hour: "8AM", text: "This is an event" },
    { hour: "9AM", text: "This is a second event" },
    { hour: "10AM", text: "This is a third event" },
    { hour: "11AM", text: "This is an event" },
    { hour: "12PM", text: "This is a second event" },
    { hour: "1PM", text: "This is a third event" },
    { hour: "2PM", text: "This is an event" },
    { hour: "3PM", text: "This is a second event" },
    { hour: "4PM", text: "This is a third event" },
    { hour: "5PM", text: "This is an event" },
]

// ** 2. Present timeblocks for standard business hours when the user scrolls down. **
function renderTimeblocks() {
    timeblocks.forEach(timeblock => {
        var blockClass = pastPresentFuture(timeblock.hour);
        var blockRow = $("<tr>").addClass("row");

        var blockHour = $("<td>").addClass("hour").text(timeblock.hour); // Display hour
        var blockText = $("<textarea>").text(timeblock.text).addClass(blockClass) // Text area
        var icon = $("<span>").text("<pic>"); // Save button icon
        var blockSave = $("<button>").addClass("saveBtn").append(icon);

        blockRow.append(blockHour);
        blockRow.append(blockText);
        blockRow.append(blockSave)




        blockTable.append(blockRow); // Add block to container
    });


}

// Use dayjs to compare block time to current time
// TODO use dayjs diff
function pastPresentFuture(hour) {
    var currentHour = dayjs().format("HH"); // Get current hour in 2-digit format

    if (hour === currentHour) {
        return "present";
    } else if (hour > currentHour) {
        return "future";
    } else {
        return "past"
    }
}

renderTimeblocks();

// 3. Color-code each timeblock based on past, present, and future when the timeblock is viewed.

// 4. Allow a user to enter an event when they click a timeblock

// 5. Save the event in local storage when the save button is clicked in that timeblock.

// 6. Persist events between refreshes of a page
