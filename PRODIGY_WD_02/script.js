// Get HTML elements
const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");

const resetBtn = document.getElementById("resetBtn");

const lapBtn = document.getElementById("lapBtn");

const clearBtn = document.getElementById("clearBtn");

const lapsList = document.getElementById("lapsList");

const emptyState = document.getElementById("emptyState");

const status = document.getElementById("status");


// Stopwatch variables

let startTime = 0;

let elapsedTime = 0;

let timer = null;

let isRunning = false;

let lapNumber = 0;

let previousLapTime = 0;


// ========================================
// FORMAT TIME
// ========================================

function formatTime(time) {

    // Calculate minutes
    const minutes =
        Math.floor(time / 60000);


    // Calculate seconds
    const seconds =
        Math.floor(
            (time % 60000) / 1000
        );


    // Calculate milliseconds
    const milliseconds =
        Math.floor(
            (time % 1000) / 10
        );


    return (
        String(minutes).padStart(2, "0")
        + ":" +
        String(seconds).padStart(2, "0")
        + ":" +
        String(milliseconds).padStart(2, "0")
    );
}


// ========================================
// UPDATE DISPLAY
// ========================================

function updateDisplay() {

    elapsedTime =
        Date.now() - startTime;

    display.textContent =
        formatTime(elapsedTime);
}


// ========================================
// START / PAUSE BUTTON
// ========================================

startBtn.addEventListener(
    "click",
    function () {

        // Start stopwatch
        if (!isRunning) {

            startTime =
                Date.now() - elapsedTime;


            timer =
                setInterval(
                    updateDisplay,
                    10
                );


            isRunning = true;


            // Change button text
            startBtn.textContent =
                "Pause";


            // Change status
            status.className =
                "status running";


            status.innerHTML =
                '<span class="status-dot"></span> Running';


            // Enable lap button
            lapBtn.disabled = false;

        }


        // Pause stopwatch
        else {

            clearInterval(timer);


            isRunning = false;


            startBtn.textContent =
                "Resume";


            status.className =
                "status paused";


            status.innerHTML =
                '<span class="status-dot"></span> Paused';

        }

    }
);


// ========================================
// RESET BUTTON
// ========================================

resetBtn.addEventListener(
    "click",
    function () {

        // Stop timer
        clearInterval(timer);


        // Reset values
        startTime = 0;

        elapsedTime = 0;

        lapNumber = 0;

        previousLapTime = 0;

        isRunning = false;


        // Reset display
        display.textContent =
            "00:00:00.00";


        // Reset button
        startBtn.textContent =
            "Start";


        // Reset status
        status.className =
            "status";


        status.innerHTML =
            '<span class="status-dot"></span> Ready';


        // Disable lap
        lapBtn.disabled = true;


        // Remove laps
        lapsList.innerHTML = "";

        lapsList.appendChild(
            emptyState
        );


        // Disable clear
        clearBtn.disabled = true;

    }
);


// ========================================
// LAP BUTTON
// ========================================

lapBtn.addEventListener(
    "click",
    function () {

        // Do nothing if stopwatch
        // is not running
        if (!isRunning) {
            return;
        }


        // Increase lap number
        lapNumber++;


        // Current elapsed time
        const currentTime =
            elapsedTime;


        // Calculate individual lap time
        const lapTime =
            currentTime -
            previousLapTime;


        // Store current time
        // for next lap calculation
        previousLapTime =
            currentTime;


        // Create new row
        const row =
            document.createElement("div");


        row.className =
            "lap-row latest";


        // Add lap information
        row.innerHTML = `

            <span class="lap-number">
                Lap ${lapNumber}
            </span>

            <span>
                ${formatTime(lapTime)}
            </span>

            <span>
                ${formatTime(currentTime)}
            </span>

        `;


        // Remove empty message
        if (emptyState.parentElement) {

            emptyState.remove();

        }


        // Remove latest style
        // from previous laps
        document
            .querySelectorAll(".lap-row")
            .forEach(function (item) {

                item.classList.remove(
                    "latest"
                );

            });


        // Add newest lap at top
        lapsList.prepend(row);


        // Enable clear button
        clearBtn.disabled = false;

    }
);


// ========================================
// CLEAR ALL LAPS
// ========================================

clearBtn.addEventListener(
    "click",
    function () {

        // Remove all laps
        lapsList.innerHTML = "";


        // Show empty state
        lapsList.appendChild(
            emptyState
        );


        // Reset lap values
        lapNumber = 0;

        previousLapTime = 0;


        // Disable clear button
        clearBtn.disabled = true;

    }
);