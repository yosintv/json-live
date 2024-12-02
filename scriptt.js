// List of league JSON files with display names
const leagueFiles = [
    { name: 'EPL', file: 'epl.json' },
    { name: 'La Liga', file: 'laliga.json' },
    { name: 'Bundesliga', file: 'bundesliga.json' },
    { name: 'Serie A', file: 'seriea.json' },
    { name: 'Ligue 1', file: 'ligue1.json' }
];

// Function to render all matches (homepage view)
function renderAllMatches() {
    const matchesContainer = document.getElementById('league-matches');
    matchesContainer.innerHTML = ''; // Clear existing matches

    leagueFiles.forEach(league => {
        fetch(`${league.file}?cacheBust=${new Date().getTime()}`)
            .then(response => response.json())
            .then(data => {
                // Create league title
                const leagueTitle = document.createElement('div');
                leagueTitle.classList.add('yosintv-button');
                leagueTitle.textContent = `Today ${league.name} Matches`;
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
            .catch(error => console.error(`Error loading ${league.file}:`, error));
    });
}

// Function to render league buttons
function renderLeagueButtons() {
    const buttonContainer = document.getElementById('league-buttons');

    // "All Matches" button
    const allButton = document.createElement('button');
    allButton.classList.add('league-button');
    allButton.textContent = 'All Matches';
    allButton.onclick = renderAllMatches; // Show all matches
    buttonContainer.appendChild(allButton);

    // Buttons for specific leagues
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
function render
