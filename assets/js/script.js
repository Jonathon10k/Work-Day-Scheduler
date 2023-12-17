var currentDay = $("#currentDay");
var blockContainer = $(".container");
var statusDisplay = $(".status")
var saveSpan = $(".save-span");

// Display the current day at the top of the calender when a user opens the planner. **
currentDay.text(dayjs().format("dddd[,]  MMMM D")) // Print the current day/month to currentDay <p>

// Array of objects to store timeblock properties
var timeblocks = [
    { hour: 9, hourStr: "9AM", text: "" },
    { hour: 10, hourStr: "10AM", text: "" },
    { hour: 11, hourStr: "11AM", text: "" },
    { hour: 12, hourStr: "12PM", text: "" },
    { hour: 13, hourStr: "1PM", text: "" },
    { hour: 14, hourStr: "2PM", text: "" },
    { hour: 15, hourStr: "3PM", text: "" },
    { hour: 16, hourStr: "4PM", text: "" },
    { hour: 17, hourStr: "5PM", text: "" },
]

// Get initial block values from storage
getStoredBlocks();
// Initial schedule render
renderTimeblocks();

// Render blocks displaying business hours and schedule content
function renderTimeblocks() {
    blockContainer.empty();

    // Create a new block for each array element
    timeblocks.forEach((timeblock, index) => {
        var block = $("<div>").addClass("row");
        var blockHour = $("<div>").addClass("hour").text(timeblock.hourStr); // Display hour
        var blockColour = pastPresentFuture(timeblock.hour); // *** 3. Color-code each timeblock based on status past/present/future
        var blockText = $("<textarea>").val(timeblock.text).addClass(blockColour).addClass(`textarea-${index}`).addClass("col-md-10 col-sm-10"); // Text area
        var saveIcon = $("<i>").addClass("fas fa-save"); // Save icon
        var blockSaveBtn = $("<button>").addClass("saveBtn").append(saveIcon);

        // Save button click handler
        blockSaveBtn.on("click", () => {
            blockSaveBtn.addClass("saveBtn-clicked");
            updateEventText(index);
            console.log("clicked")

            setTimeout(() => {
                blockSaveBtn.removeClass("saveBtn-clicked");
            }, 1000)
        })

        // Append elements to block row
        block.append(blockHour);
        block.append(blockText);
        block.append(blockSaveBtn)
        // Append block row to block table
        blockContainer.append(block);
    });
}

// Use dayjs to compare block time to current time
// TODO use dayjs diff
function pastPresentFuture(hour) {
    var currentHour = dayjs().format("H"); // Get current hour with AM/PM
    var blockHour = hour;

    if (blockHour == currentHour) {
        console.log("Now:", currentHour, "Block value:", blockHour, "[Current time].")
        return "present"; // Add red bg
    } else if (blockHour > currentHour) {
        console.log("Now:", currentHour, "Block value:", blockHour, "[Future time].");
        return "future"; // Add green bg
    } else if (blockHour < currentHour) {
        console.log("Now:", currentHour, "Block value:", blockHour, "[Past time].");
        return "past" // Add grey bg
    }
}


function updateEventText(index) {
    console.log("INDEX", index);
    var newText = $(`.textarea-${index}`).val();
    timeblocks[index].text = newText;
    displaySaved();
    setStoredBlocks();
}

// Function to get blocks object from localStorage
function getStoredBlocks() {
    if (localStorage.getItem("timeblocksStored") !== null) {
        var storedBlocks = localStorage.getItem("timeblocksStored");
        timeblocks = JSON.parse(storedBlocks);
    } else {
        console.log("No values in localStorage.")
        return;
    }
}

function setStoredBlocks() {
    var savedBlocks = JSON.stringify(timeblocks);
    localStorage.setItem("timeblocksStored", savedBlocks);
    console.log("Blocks stored");
    displaySaved();
}

// Clear localStorage for debug
function clearLS() {
    localStorage.removeItem("timeblocksStored");
}

// Display status message on save and hide after time elapse
function displaySaved() {
    var saveLocation = $("<span>").addClass("save-span").text("localStorage");
    statusDisplay.text("Appointment added to ");
    statusDisplay.append(saveLocation);
    statusDisplay.removeClass("hide");

    setTimeout(() => { // Hide message after 4 secs
        statusDisplay.addClass("hide");
    }, 4000)
}