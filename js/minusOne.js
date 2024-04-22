document.getElementById('add-option-btn').addEventListener('click', function() {
    const optionsContainer = document.getElementById('options-container');
    const numOptions = optionsContainer.getElementsByTagName('input').length;

    if (numOptions < 6) {
        const newOption = document.createElement('input');
        newOption.type = 'text';
        newOption.placeholder = `Option ${numOptions + 1}`;
        optionsContainer.appendChild(newOption);
    } else {
        alert('Maximum of 6 options are allowed.');
    }
});

document.getElementById('create-poll-btn').addEventListener('click', function() {
    const question = document.getElementById('poll-question').value.trim();
    const optionsNodes = document.getElementById('options-container').getElementsByTagName('input');
    let options = Array.from(optionsNodes).map(option => option.value.trim()).filter(Boolean);

    if (question && options.length > 0) {
        document.getElementById('poll-creator-container').style.display = 'none';
        runMinusOnePoll(question, options);
    } else {
        alert('Please enter a question and at least one option.');
    }
});

function runMinusOnePoll(question, options) {
    const pollDisplay = document.getElementById('poll-display-container');
    pollDisplay.style.display = 'block';

    function displayOptions(options) {
        document.getElementById('display-question').textContent = question;
        const displayOptions = document.getElementById('display-options');
        displayOptions.innerHTML = '';

        options.forEach((option, index) => {
            const li = document.createElement('li');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'pollOption';
            radio.value = option;
            radio.id = 'option' + index;

            const label = document.createElement('label');
            label.htmlFor = radio.id;
            label.textContent = option;

            li.appendChild(radio);
            li.appendChild(label);
            displayOptions.appendChild(li);
        });

        const voteButton = document.createElement('button');
        voteButton.textContent = 'Vote';
        voteButton.onclick = function() {
            const selectedOption = document.querySelector('input[name="pollOption"]:checked');
            if (selectedOption) {
                options = options.filter(option => option !== selectedOption.value);
                if (options.length > 1) {
                    displayOptions(options);
                } else if (options.length === 1) {
                    alert('The final remaining option is: ' + options[0]);
                    pollDisplay.style.display = 'none'; // or reset for a new poll
                }
            } else {
                alert('Please select an option to vote for!');
            }
        };
        displayOptions.appendChild(voteButton);
    }

    displayOptions(options);
}
