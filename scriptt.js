// Global array to hold all league data
let leaguesData = [];

// Function to fetch and load all leagues
function loadLeagues() {
    const leagueFiles = [
        'leagues/epl.json',
        'leagues/la_liga.json',
        'leagues/bundesliga.json',
        'leagues/serie_a.json',
        'leagues/ligue_1.json'
        // Add more league files here as needed
    ];

    leaguesData = []; // Clear previous data

    // Fetch all league files
    Promise.all(leagueFiles.map(file => fetch(file).then(res => res.json())))
        .then(dataArray => {
            leaguesData = dataArray;
            renderAllMatches(); // Render all matches initially
            renderLeagueButtons(); // Render league buttons
        })
        .catch(error => console.error('Error loading leagues:', error));
}

// Function to render all matches on the homepage
function renderAllMatches() {
    const container = document.getElementById('yosintv-football');
    container.innerHTML = ''; // Clear previous content

    leaguesData.forEach(league => {
        // Create league title
        const leagueTitle = document.createElement('div');
        leagueTitle.classList.add('yosintv-button');
        leagueTitle.textContent = `Today ${league.league} Matches`;
        container.appendChild(leagueTitle);

        // Create matches container
        const leagueContainer = document.createElement('div');
        leagueContainer.classList.add('yosintv-container');
        container.appendChild(leagueContainer);

        // Render each match
        league.matches.forEach(match => renderEvent(match, leagueContainer));
    });
}

// Function to render matches for a specific league
function renderLeagueMatches(leagueName) {
    const container = document.getElementById('yosintv-football');
    container.innerHTML = ''; // Clear previous content

    const league = leaguesData.find(l => l.league === leagueName);

    if (league) {
        // Create league title
        const leagueTitle = document.createElement('div');
        leagueTitle.classList.add('yosintv-button');
        leagueTitle.textContent = `Today ${league.league} Matches`;
        container.appendChild(leagueTitle);

        // Create matches container
        const leagueContainer = document.createElement('div');
        leagueContainer.classList.add('yosintv-container');
        container.appendChild(leagueContainer);

        // Render each match
        league.matches.forEach(match => renderEvent(match, leagueContainer));
    }
}

// Function to render an individual event
function renderEvent(event, container) {
    const eventElement = document.createElement('div');
    eventElement.classList.add('event');
    eventElement.setAttribute('data-link', event.link);
    eventElement.setAttribute('data-start', event.start);
    eventElement.setAttribute('data-duration', event.duration);

    const eventName = document.createElement('div');
    eventName.classList.add('event-name');
    eventName.textContent = event.name;

    const countdown = document.createElement('div');
    countdown.classList.add('event-countdown');

    eventElement.appendChild(eventName);
    eventElement.appendChild(countdown);
    container.appendChild(eventElement);

    // Click to navigate to the match link
    eventElement.onclick = function () {
        window.location.href = event.link;
    };
}

// Function to render league buttons
function renderLeagueButtons() {
    const buttonContainer = document.getElementById('league-buttons');
    buttonContainer.innerHTML = ''; // Clear previous buttons

    // Create "All Matches" button
    const allMatchesButton = document.createElement('button');
    allMatchesButton.textContent = 'All Matches';
    allMatchesButton.classList.add('yosintv-button');
    allMatchesButton.onclick = renderAllMatches;
    buttonContainer.appendChild(allMatchesButton);

    // Create individual league buttons
    leaguesData.forEach(league => {
        const leagueButton = document.createElement('button');
        leagueButton.textContent = league.league;
        leagueButton.classList.add('yosintv-button');
        leagueButton.onclick = () => renderLeagueMatches(league.league);
        buttonContainer.appendChild(leagueButton);
    });
}

// Function to update match countdowns
function updateStatus() {
    const eventElements = document.querySelectorAll('.event');
    const currentTime = new Date().getTime();

    eventElements.forEach(element => {
        const startTime = new Date(element.getAttribute('data-start')).getTime();
        const durationHours = parseFloat(element.getAttribute('data-duration'));
        const endTime = startTime + durationHours * 60 * 60 * 1000;
        const countdownElement = element.querySelector('.event-countdown');

        if (currentTime < startTime) {
            const timeDiff = startTime - currentTime;
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `<span>${hours}h</span> <span>${minutes}m</span> <span>${seconds}s</span>`;
        } else if (currentTime >= startTime && currentTime <= endTime) {
            countdownElement.innerHTML = '<div class="event-live blink">Live Now</div>';
        } else {
            countdownElement.textContent = 'Match End';
        }
    });
}

// Update every second
setInterval(updateStatus, 1000);
updateStatus();

// Load all leagues on page load
loadLeagues();
