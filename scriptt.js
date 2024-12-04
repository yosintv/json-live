// Function to fetch and process leagues from multiple JSON files
function fetchAndRenderLeagues(jsonFiles, containerId) {
    const container = document.getElementById(containerId);

    // Fetch all JSON files concurrently
    Promise.all(jsonFiles.map(file => fetch(file).then(res => res.json())))
        .then(dataSets => {
            dataSets.forEach(data => {
                // Loop through leagues in each JSON file
                data.footballLeagues.forEach(league => {
                    // Render league and matches
                    renderLeague(league, container);
                });
            });
        })
        .catch(error => console.error('Error loading data:', error));
}

// Render a single league and its matches
function renderLeague(league, container) {
    // Add league title
    const leagueTitle = document.createElement('div');
    leagueTitle.classList.add('league-title');
    leagueTitle.textContent = `Today ${league.league} Matches`;
    container.appendChild(leagueTitle);

    // Add matches
    league.matches.forEach(match => {
        renderMatch(match, container);
    });
}

// Render a single match
function renderMatch(match, container) {
    const matchElement = document.createElement('div');
    matchElement.classList.add('event');
    matchElement.setAttribute('data-link', match.link);
    matchElement.setAttribute('data-start', match.start);
    matchElement.setAttribute('data-duration', match.duration);

    const matchName = document.createElement('div');
    matchName.classList.add('event-name');
    matchName.textContent = match.name;

    const countdown = document.createElement('div');
    countdown.classList.add('event-countdown');

    matchElement.appendChild(matchName);
    matchElement.appendChild(countdown);
    container.appendChild(matchElement);

    // Add click event
    matchElement.onclick = function () {
        window.location.href = match.link;
    };
}

// Update event statuses
function updateStatus() {
    const events = document.querySelectorAll('.event');
    const currentTime = new Date().getTime();

    events.forEach(event => {
        const startTime = new Date(event.getAttribute('data-start')).getTime();
        const durationHours = parseFloat(event.getAttribute('data-duration'));
        const endTime = startTime + durationHours * 60 * 60 * 1000;
        const countdown = event.querySelector('.event-countdown');

        if (currentTime < startTime) {
            const timeDiff = startTime - currentTime;
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            countdown.textContent = `${hours}h ${minutes}m ${seconds}s`;
        } else if (currentTime >= startTime && currentTime <= endTime) {
            countdown.innerHTML = `<span class="event-live">Live Now</span>`;
        } else {
            countdown.textContent = 'Match Ended';
        }
    });
}

// Start fetching data and updating statuses
const jsonFiles = ['football.json', 'laliga.json']; // Add more files if needed
fetchAndRenderLeagues(jsonFiles, 'yosintv-football');

// Update statuses every second
setInterval(updateStatus, 1000);
updateStatus();
