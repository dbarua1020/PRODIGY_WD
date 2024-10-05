let startTime, elapsedTime = 0, timerInterval;

const displayElement = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

function updateTime() {
    const currentTime = Date.now() - startTime + elapsedTime;
    const hours = Math.floor(currentTime / (1000 * 60 * 60));
    const minutes = Math.floor((currentTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((currentTime % (1000 * 60)) / 1000);

    displayElement.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startButton.addEventListener('click', () => {
    startTime = Date.now();
    timerInterval = setInterval(updateTime, 1000);
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;
});

stopButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    startButton.disabled = false;
    stopButton.disabled = true;
});

resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    displayElement.textContent = '00:00:00';
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
});

// Initialize button states
stopButton.disabled = true;
resetButton.disabled = true;
