function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function setupTournament() {
    const optionsText = document.getElementById('optionsInput').value.trim();
    const options = optionsText.split('\n').filter(option => option.trim() !== '');
    const validCounts = [4, 8, 16];
    if (!validCounts.includes(options.length)) {
        alert('Number of options must be 4, 8, or 16.');
        return;
    }
    shuffleArray(options);
    window.currentOptions = options;
    setupMatchups(options);
    displayMatchups();
}

function setupMatchups(options) {
    window.currentMatchups = [];
    for (let i = 0; i < options.length; i += 2) {
        window.currentMatchups.push([options[i], options[i + 1]]);
    }
}

function displayMatchups() {
    const matchupsElement = document.getElementById('matchups');
    matchupsElement.innerHTML = '';
    window.currentMatchups.forEach((matchup, index) => {
        const matchupElement = document.createElement('div');
        matchupElement.className = 'matchup';
        matchupElement.innerHTML = `<span>${matchup[0]}</span> vs <span>${matchup[1]}</span>
            <button class="vote-button" onclick="vote(${index}, 0)">Vote</button>
            <button class="vote-button" onclick="vote(${index}, 1)">Vote</button>`;
        matchupsElement.appendChild(matchupElement);
    });

    const nextRoundButton = document.getElementById('nextRound');
    if (window.currentMatchups.length > 1) {
        nextRoundButton.style.display = 'block';
    } else {
        nextRoundButton.style.display = 'none';
    }

    document.getElementById('setup').style.display = 'none';
    document.getElementById('tournament').style.display = 'block';
}

function vote(matchupIndex, optionIndex) {
    const winner = window.currentMatchups[matchupIndex][optionIndex];
    window.currentOptions.push(winner); 
    window.currentMatchups.splice(matchupIndex, 1); 
    if (window.currentMatchups.length === 0) { 
        setupNextRound();
    } else {
        displayMatchups(); 
    }
}

function setupNextRound() {
    if (window.currentOptions.length === 1) {
        alert(`Winner is ${window.currentOptions[0]}!`);
        location.reload();
        return;
    }
    setupMatchups(window.currentOptions); 
    window.currentOptions = [];
    displayMatchups();
}

window.onload = function() {
    document.getElementById('nextRound').style.display = 'none'; 
}
