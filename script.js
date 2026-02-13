let current = 0;
const screens = document.querySelectorAll(".screen");
let noCount = 0;
const noMessages = [
    "Woah, bro? Are you sure?",
    "Really?",
    "Well, your choice it is..."
];

// Heart Particle System
function createHearts() {
    const bg = document.querySelector('.hearts-bg') || document.createElement('div');
    if (!bg.className) {
        bg.className = 'hearts-bg';
        document.body.appendChild(bg);
    }

    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    bg.appendChild(heart);
    
    setTimeout(() => heart.remove(), 6000);
}
setInterval(createHearts, 500);

// Navigation
function nextScreen() {
    screens[current].classList.remove("active");
    current++;
    if (current < screens.length) {
        screens[current].classList.add("active");
        if (current === screens.length - 1) setupFinalScreen();
    }
}

// Final Game Logic
function setupFinalScreen() {
    const typewriter = document.getElementById("typewriter");
    typewriter.innerHTML = `
                <h3 style="font-family: 'Cormorant Garamond';">Will you be my Valentine?</h3>
        <div id="buttonGroup">
            <button id="yesBtn" onclick="celebrate()">YES!</button>
            <button id="noBtn" onclick="handleNo()">No</button>
        </div>
    `;
}

function handleNo() {
    const noBtn = document.getElementById("noBtn");
    const yesBtn = document.getElementById("yesBtn");

    if (noCount < noMessages.length) {
        noBtn.innerHTML = noMessages[noCount];
        let size = parseFloat(window.getComputedStyle(yesBtn).fontSize);
        yesBtn.style.fontSize = (size + 10) + "px";
        yesBtn.style.padding = "20px 60px";
        noCount++;
    } else {
        noBtn.innerHTML = "YES";
        noBtn.style.background = "linear-gradient(45deg, #ff4d6d, #c9184a)";
        noBtn.onclick = celebrate;
    }
}

function celebrate() {
    const container = document.querySelector(".screen.active");
    container.innerHTML = `
        <div class="symbol-box" style="font-size: 80px;">😘</div>
        <h1 style="font-size: 2.5rem;">YAY! ❤️</h1>
        <p>Now you are stuck with a silly and weird girl(I'll make sure to attend jokes 101 )</p>
        <button onclick="location.reload()">Replay</button>
    `;
    for(let i=0; i<80; i++) setTimeout(createHearts, i * 60);
}