// Fetch JSON data and render events dynamically
fetch('events.json')
    .then(response => response.json())
    .then(events => {
        renderEvents(events);
        setInterval(updateStatus, 1000);
        updateStatus();
    })
    .catch(error => console.error('Error loading events:', error));

function renderEvents(events) {
    const container = document.getElementById('events-container');

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
}

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
