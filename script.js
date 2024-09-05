const wheel = document.getElementById('wheel');
const nameInput = document.getElementById('nameInput');
const addNameButton = document.getElementById('addNameButton');
const spinButton = document.getElementById('spinButton');
const wheelFullMessage = document.getElementById('wheelFullMessage');

const names = [];
const maxNames = 12; // Set the maximum number of names
let spinning = false;

addNameButton.addEventListener('click', addName);
spinButton.addEventListener('click', spinWheel);

function addName() {
    const name = nameInput.value.trim();
    if (name && names.length < maxNames) {
        names.push(name);
        updateWheel();
        nameInput.value = '';
    } else if (names.length >= maxNames) {
        wheelFullMessage.style.display = 'block';
    }
}

function updateWheel() {
    wheel.innerHTML = '';
    const totalNames = names.length;
    const minPercentage = 50; // Minimum percentage per name (100%/2)
    
    let totalPercentage = Math.max(100, totalNames * minPercentage);
    let startAngle = 0;

    names.forEach((name, index) => {
        const slice = document.createElement('div');
        slice.className = 'slice';
        
        // Calculate percentage for this slice
        let percentage = (minPercentage / totalPercentage) * 100;
        
        const sliceAngle = (percentage / 100) * 360;

        slice.style.transform = `rotate(${startAngle}deg)`;
        slice.style.clipPath = `polygon(0 0, 100% 0, 100% 100%, 0 100%)`;
        slice.style.width = '100%';
        slice.style.height = '100%';
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = name;
        nameSpan.style.transform = `rotate(${sliceAngle / 2}deg)`;
        
        slice.appendChild(nameSpan);
        wheel.appendChild(slice);

        startAngle += sliceAngle;
    });
}

function spinWheel() {
    if (spinning || names.length < 2) return;
    spinning = true;
    spinButton.disabled = true;

    const spins = 5 + Math.floor(Math.random() * 5); // 5 to 9 full spins
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalDegrees = spins * 360 + extraDegrees;
    
    wheel.style.transition = `transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)`;
    wheel.style.transform = `rotate(${totalDegrees}deg)`;

    setTimeout(() => {
        spinning = false;
        spinButton.disabled = false;
        const winnerIndex = Math.floor(names.length - (extraDegrees / (360 / names.length))) % names.length;
        showWinner(names[winnerIndex]);
    }, 5000);
}

function showWinner(winner) {
    const modal = document.getElementById('winnerModal');
    const winnerName = document.getElementById('winnerName');
    winnerName.textContent = winner;
    modal.style.display = 'flex';
}

// Initialize the wheel
updateWheel();