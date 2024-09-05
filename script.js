let names = [];
const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spinButton');
const addNameButton = document.getElementById('addNameButton');
const nameInput = document.getElementById('nameInput');
const winnerModal = document.getElementById('winnerModal');
const winnerMessage = document.getElementById('winnerMessage');
const closeTabButton = document.getElementById('closeTabButton');
const removeWinnerButton = document.getElementById('removeWinnerButton');

// Function to add name to the wheel
function addName() {
    const name = nameInput.value.trim();
    if (name) {
        names.push(name);
        updateWheel();
        nameInput.value = ''; // Clear input
    }
}

// Event listener for adding name on button click
addNameButton.addEventListener('click', addName);

// Event listener for adding name on Enter key press
nameInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addName();
    }
});

spinButton.addEventListener('click', () => {
    if (names.length === 0) {
        alert("Please add names to the wheel.");
        return;
    }
    const randomDegree = Math.floor(Math.random() * 360 + 3600); // Spin multiple times
    wheel.style.transition = 'transform 4s cubic-bezier(0.33, 1, 0.68, 1)';
    wheel.style.transform = `rotate(${randomDegree}deg)`;
    
    // Simulate selection after spin
    setTimeout(() => {
        const selectedIndex = Math.floor((randomDegree % 360) / (360 / names.length));
        showWinner(names[selectedIndex]);
    }, 4000); // Match duration of spin
});

function updateWheel() {
    wheel.innerHTML = ''; // Clear existing names
    const angleStep = 360 / names.length; // Calculate angle for each name
    names.forEach((name, index) => {
        const nameDiv = document.createElement('div');
        nameDiv.className = 'name';
        nameDiv.style.setProperty('--i', index);
        nameDiv.style.transform = `rotate(${index * angleStep}deg) translateX(100%)`; // Position each name
        nameDiv.textContent = name;
        wheel.appendChild(nameDiv);
    });
}

function showWinner(winner) {
    winnerMessage.textContent = `We have a winner! ${winner}`;
    winnerModal.style.display = 'flex'; // Show modal
}

closeTabButton.addEventListener('click', () => {
    window.close(); // Close the tab
});

removeWinnerButton.addEventListener('click', () => {
    const winner = winnerMessage.textContent.split(' ')[3]; // Extract winner's name
    names = names.filter(name => name !== winner); // Remove winner from list
    updateWheel(); // Update the wheel
    winnerModal.style.display = 'none'; // Hide modal
});