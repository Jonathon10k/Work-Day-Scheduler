var currentDay = $("#currentDay");
var blockContainer = $(".container");
var blockTable = $("<table>")
blockContainer.append(blockTable);

// ** 1. Display the current day at the top of the calender when a user opens the planner. **
currentDay.text(dayjs().format("dddd[,]  MMMM D")) // Print the current day/month to currentDay <p>

// Array of objects to store timeblock properties
var timeblocks = [
    { hour: "9AM", text: "d" },
    { hour: "10AM", text: "" },
    { hour: "11AM", text: "" },
    { hour: "12PM", text: "" },
    { hour: "1PM", text: "" },
    { hour: "2PM", text: "" },
    { hour: "3PM", text: "" },
    { hour: "4PM", text: "" },
    { hour: "5PM", text: "" },
]

// ** 2. Present timeblocks for standard business hours when the user scrolls down. **
function renderTimeblocks() {
    var currentBlocksLen = 0;
    if (currentBlocksLen < timeblocks.length) {

        // Create a new block for each array element
        timeblocks.forEach((timeblock, index) => {
            var block = $("<tr>").addClass("row");
            var blockHour = $("<td>").addClass("hour").text(timeblock.hour); // Display hour
            var blockColour = pastPresentFuture(timeblock.hour); // *** 3. Color-code each timeblock based on status past/present/future
            var blockText = $("<textarea>").val(timeblock.text).addClass(blockColour).addClass(`textarea-${index}`); // Text area
            var saveIcon = $("<i>").addClass("fas fa-save"); // Save icon
            var blockSaveBtn = $("<button>").addClass("saveBtn").append(saveIcon);
            
            // Save button click handler
            blockSaveBtn.on("click", () => {
                blockSaveBtn.addClass("saveBtn-clicked");
                updateEventText(index);
                console.log("clicked")
            })
            
            // Append elements to block row
            block.append(blockHour);
            block.append(blockText);
            block.append(blockSaveBtn)
            // Append block row to block table
            blockTable.append(block);
            currentBlocksLen++;
        });
        console.log("current blocks:", currentBlocksLen)
    }

}

// Use dayjs to compare block time to current time
// TODO use dayjs diff
function pastPresentFuture(hour) {
    var currentHour = dayjs().format("hA"); // Get current hour with AM/PM
    var blockHour = hour;
    //console.log("block hour", blockHour, "current hour", currentHour)
    if (blockHour === currentHour) {
        console.log("current:", currentHour, "block hour:", blockHour, ".It's the same")
        return "present"; // Add red bg
    } else if (blockHour > currentHour) {
        console.log("current:", currentHour, "block hour:", blockHour, ".blockHour is more than");
        return "future"; // Add green bg
    } else if (blockHour < currentHour) {
        console.log("current:", currentHour, "block hour:", blockHour, ".blockHour is less than: past");
        return "past" // Add grey bg

    }
}


function updateEventText(index) {
    console.log("button", index, "clicked.");

    var newText = 
    timeblocks[index].text = "TEXT CHANGED";
    
    
    renderTimeblocks();
}

renderTimeblocks();


// 4. Allow a user to enter an event when they click a timeblock

// 5. Save the event in local storage when the save button is clicked in that timeblock.

// 6. Persist events between refreshes of a page
