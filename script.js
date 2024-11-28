// Fetch cricket events
fetch('cricket.json')
    .then(response => response.json())
    .then(events => {
        renderEvents(events, 'cricket-container');
    })
    .catch(error => console.error('Error loading cricket events:', error));

// Fetch football events
fetch('football.json')
    .then(response => response.json())
    .then(events => {
        renderEvents(events, 'football-container');
    })
    .catch(error => console.error('Error loading football events:', error));

// Render events dynamically
function renderEvents(events, containerId) {
    const container = document.getElementById(containerId);

    events.forEach(event => {
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
    });

    // Start status updates for all events
    setInterval(updateStatus, 1000);
    updateStatus();
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
