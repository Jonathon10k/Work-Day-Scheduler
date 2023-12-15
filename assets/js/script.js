var currentDay = $("#currentDay");
var blockContainer = $(".container");

// 1. Display the current day at the top of the calender when a user opens the planner.
currentDay.text(dayjs().format("dddd[,]  MMMM D")) // ** Print the current day/month to currentDay <p>

// 2. Present timeblocks for standard business hours when the user scrolls down.

// 3. Color-code each timeblock based on past, present, and future when the timeblock is viewed.

// 4. Allow a user to enter an event when they click a timeblock

// 5. Save the event in local storage when the save button is clicked in that timeblock.

// 6. Persist events between refreshes of a page
