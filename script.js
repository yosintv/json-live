// Function to fetch football data
function fetchFootballSchedule() {
    const footballUrl = 'football.json?t=' + new Date().getTime(); // Cache busting with timestamp

    fetch(footballUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Football data fetched:", data);
            displayFootballMatches(data);
        })
        .catch(error => console.error('Error fetching football data:', error));
}

// Function to fetch cricket data
function fetchCricketSchedule() {
    const cricketUrl = 'cricket.json?t=' + new Date().getTime(); // Cache busting with timestamp

    fetch(cricketUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Cricket data fetched:", data);
            displayCricketMatches(data);
        })
        .catch(error => console.error('Error fetching cricket data:', error));
}

// Function to display football matches (You can adapt this function based on your display logic)
function displayFootballMatches(data) {
    const footballContainer = document.querySelector('.yosintv-football');
    data.footballLeagues.forEach(league => {
        let leagueDiv = document.createElement('div');
        leagueDiv.classList.add('yosintv-league');
        let leagueTitle = document.createElement('h3');
        leagueTitle.innerText = league.league;
        leagueDiv.appendChild(leagueTitle);

        league.matches.forEach(match => {
            let matchDiv = document.createElement('div');
            matchDiv.classList.add('event');
            matchDiv.innerHTML = `
                <div class="event-name">${match.name}</div>
                <div class="event-countdown">${match.start}</div>
            `;
            footballContainer.appendChild(matchDiv);
        });
    });
}

// Function to display cricket matches (Similar to football matches display logic)
function displayCricketMatches(data) {
    const cricketContainer = document.querySelector('.yosintv-cricket');
    data.cricketLeagues.forEach(league => {
        let leagueDiv = document.createElement('div');
        leagueDiv.classList.add('yosintv-league');
        let leagueTitle = document.createElement('h3');
        leagueTitle.innerText = league.league;
        leagueDiv.appendChild(leagueTitle);

        league.matches.forEach(match => {
            let matchDiv = document.createElement('div');
            matchDiv.classList.add('event');
            matchDiv.innerHTML = `
                <div class="event-name">${match.name}</div>
                <div class="event-countdown">${match.start}</div>
            `;
            cricketContainer.appendChild(matchDiv);
        });
    });
}

// Fetch both football and cricket data
fetchFootballSchedule();
fetchCricketSchedule();
