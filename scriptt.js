// List of league JSON files with display names
const leagueFiles = [
    { name: 'EPL', file: 'epl.json' },
    { name: 'La Liga', file: 'laliga.json' },
    { name: 'Bundesliga', file: 'bundesliga.json' },
    { name: 'Serie A', file: 'seriea.json' },
    { name: 'Ligue 1', file: 'ligue1.json' }
];

// Function to render league buttons
function renderLeagueButtons() {
    const buttonContainer = document.getElementById('league-buttons');

    leagueFiles.forEach(league => {
        const button = document.createElement('button');
        button.classList.add('league-button');
        button.textContent = league.name;
        button.onclick = () => showLeagueMatches(league.file, league.name);
        buttonContainer.appendChild(button);
    });
}

// Function to fetch and display matches for a particular league
function showLeagueMatches(jsonFile, leagueName) {
    const matchesContainer = document.getElementById('league-matches');
    matchesContainer.innerHTML = ''; // Clear existing matches

    fetch(`${jsonFile}?cacheBust=${new Date().getTime()}`)
        .then(response => response.json())
        .then(data => {
            // Create league title
            const leagueTitle = document.createElement('div');
            leagueTitle.classList.add('yosintv-button');
            leagueTitle.textContent = `Today ${leagueName} Matches`;
            matchesContainer.appendChild(leagueTitle);

            // Create container for matches under this league
            const leagueContainer = document.createElement('div');
            leagueContainer.classList.add('yosintv-container');
            matchesContainer.appendChild(leagueContainer);

            // Render matches
            data.matches.forEach(match => {
                renderEvent(match, leagueContainer);
            });
        })
        .catch(error => console.error(`Error loading ${jsonFile}:`, error));
}

// Render individual match
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
}

// Update event statuses (Live, Countdown, Ended)
function updateStatus() {
    const eventElements = document.querySelectorAll('.event');
    const currentTime = new Date().getTime();

    eventElements.forEach(element => {
        const startTime = new Date(element.getAttribute('data-start')).getTime();
        const durationHours = parseFloat(element.getAttribute('data-duration'));
        const endTime = startTime + durationHours * 60 * 60 * 1000;
        const eventCountdownElement = element.querySelector('.event-countdown');

        if (currentTime < startTime) {
            const timeDiff = startTime - currentTime;
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            eventCountdownElement.innerHTML = `<span>${hours}h</span> <span>${minutes}m</span> <span>${seconds}s</span>`;
        } else if (currentTime >= startTime && currentTime <= endTime) {
            eventCountdownElement.innerHTML = '<div class="event-live blink">Live Now</div>';
        } else {
            eventCountdownElement.textContent = 'Match End';
        }

        element.onclick = function () {
            window.location.href = element.getAttribute('data-link');
        };
    });
}

// Initialize
renderLeagueButtons();
setInterval(updateStatus, 1000);
updateStatus();
