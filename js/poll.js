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
    const options = Array.from(optionsNodes).map(option => option.value.trim()).filter(Boolean);

    if (question && options.length > 0) {
        document.getElementById('poll-creator-container').style.display = 'none';
        document.getElementById('poll-display-container').style.display = 'block';

        document.getElementById('display-question').textContent = question;

        const displayOptions = document.getElementById('display-options');
        displayOptions.innerHTML = '';
        options.forEach(option => {
            const li = document.createElement('li');
            li.textContent = option;
            displayOptions.appendChild(li);
        });
    } else {
        alert('Please enter a question and at least one option.');
    }
});
