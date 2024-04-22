function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// works but needs improvement

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
    window.currentMatchups = [];
    for (let i = 0; i < options.length; i += 2) {
        window.currentMatchups.push([options[i], options[i+1]]);
    }
    displayMatchups();
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
    document.getElementById('setup').style.display = 'none';
    document.getElementById('tournament').style.display = 'block';
}

// BROKEN , will try to fix 

function vote(matchupIndex, optionIndex) {
    const selectedOption = window.currentMatchups[matchupIndex][optionIndex];
    window.currentMatchups.splice(matchupIndex, 1); 
    window.currentOptions = window.currentOptions.filter(option => option !== selectedOption);
    if (window.currentOptions.length === 1) {
        alert(`Winner is ${window.currentOptions[0]}!`);
        location.reload();
        return;
    }
    if (window.currentMatchups.length === 0) { 
        setupNextRound();
    }
}

//ALSO KINDA BROKEN 

function setupNextRound() {
    if (window.currentOptions.length === 1) {
        alert(`Winner is ${window.currentOptions[0]}!`);
        location.reload();
        return;
    }
    const newMatchups = [];
    for (let i = 0; i < window.currentOptions.length; i += 2) {
        newMatchups.push([window.currentOptions[i], window.currentOptions[i+1]]);
    }
    window.currentMatchups = newMatchups;
    displayMatchups();
}

window.onload = function() {
    document.getElementById('nextRound').style.display = 'none'; 
}
