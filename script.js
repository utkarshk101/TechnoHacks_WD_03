(function () {
    let timer = false;
    let hour = 0;
    let minute = 0;
    let second = 0;
    let count = 0;
    let lapTimes = [];
    let timeoutId;

    let startBtn = document.getElementById('start');
    let stopBtn = document.getElementById('stop');
    let resetBtn = document.getElementById('reset');
    let lapBtn = document.getElementById('lap');
    let lapTimesContainer = document.getElementById('lapTimes');

    startBtn.addEventListener('click', function () {
        timer = true;
        stopWatch();
    });

    stopBtn.addEventListener('click', function () {
        timer = false;
        clearTimeout(timeoutId);
    });

    resetBtn.addEventListener('click', function () {
        timer = false;
        hour = 0;
        minute = 0;
        second = 0;
        count = 0;
        lapTimes = [];
        updateDisplay();
        resetLapTimesDisplay();
        clearTimeout(timeoutId);
    });

    lapBtn.addEventListener('click', function () {
        if (timer) {
            lapTimes.push(getCurrentTime());
            updateLapTimesDisplay();
        }
    });

    function stopWatch() {
        if (timer) {
            count++;
            if (count === 100) {
                second++;
                count = 0;
            }
            if (second === 60) {
                minute++;
                second = 0;
            }
            if (minute === 60) {
                hour++;
                minute = 0;
                second = 0;
            }

            updateDisplay();

            timeoutId = setTimeout(stopWatch, 10);
        }
    }

    function getCurrentTime() {
        return `${formatTimeValue(hour)}:${formatTimeValue(minute)}:${formatTimeValue(second)}.${formatTimeValue(count)}`;
    }

    function formatTimeValue(value) {
        return value < 10 ? "0" + value : value;
    }

    function updateDisplay() {
        document.getElementById('hr').innerHTML = formatTimeValue(hour);
        document.getElementById('min').innerHTML = formatTimeValue(minute);
        document.getElementById('sec').innerHTML = formatTimeValue(second);
        document.getElementById('count').innerHTML = formatTimeValue(count);
    }

    function updateLapTimesDisplay() {
        lapTimesContainer.innerHTML = "";
        for (let i = 0; i < lapTimes.length; i++) {
            let lapTimeItem = document.createElement('li');
            lapTimeItem.textContent = getLapTimeString(i);
            lapTimesContainer.appendChild(lapTimeItem);
        }
    }

    function resetLapTimesDisplay() {
        lapTimesContainer.innerHTML = "";
    }

    function getLapTimeString(index) {
        if (index > 0) {
            let currentLapTime = lapTimes[index];
            let previousLapTime = lapTimes[index - 1];
            let timeDifference = calculateTimeDifference(currentLapTime, previousLapTime);
            return `Lap ${index + 1}: ${currentLapTime} (+${timeDifference})`;
        } else {
            return `Lap 1: ${lapTimes[0]}`;
        }
    }

    function calculateTimeDifference(currentTime, previousTime) {
        let currentTimeInSeconds = convertTimeToSeconds(currentTime);
        let previousTimeInSeconds = convertTimeToSeconds(previousTime);
        let differenceInSeconds = currentTimeInSeconds - previousTimeInSeconds;

        return formatTimeDifference(differenceInSeconds);
    }

    function convertTimeToSeconds(time) {
        let [hours, minutes, seconds] = time.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    }

    function formatTimeDifference(seconds) {
        let formattedHours = Math.floor(seconds / 3600);
        let formattedMinutes = Math.floor((seconds % 3600) / 60);
        let formattedSeconds = seconds % 60;

        return `${formatTimeValue(formattedHours)}:${formatTimeValue(formattedMinutes)}:${formatTimeValue(formattedSeconds)}`;
    }
})();
