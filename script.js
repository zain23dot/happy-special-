// --- Global Configurations ---
const CONFIG = {
    password: "2907", // Your custom passcode entry
    letterText: "Happy Birthday, Mahii! 💖\n\nI don't think words will ever be enough to explain what you mean to me, but today I'll still try. You walked into my life so quietly, yet somehow changed everything so loudly. Since you came into my world, even ordinary days feel softer, happier, and more meaningful. You make everything beautiful! ✨"
};

let poppedCount = 0;
let revealedWords = [];

// --- Live Background Decoration Particle Engine ---
function createBackgroundParticles() {
    const bgContainer = document.getElementById("heartsBg");
    const icons = ['💖', '✨', '🎈', '🌸', '💝'];
    
    setInterval(() => {
        const particle = document.createElement("div");
        particle.classList.add("heart-particle");
        particle.innerText = icons[Math.floor(Math.random() * icons.length)];
        
        particle.style.left = Math.random() * 100 + "vw";
        particle.style.fontSize = (Math.random() * 20 + 15) + "px";
        particle.style.animationDuration = (Math.random() * 3 + 4) + "s";
        
        bgContainer.appendChild(particle);
        
        setTimeout(() => { particle.remove(); }, 7000);
    }, 400);
}
window.addEventListener('DOMContentLoaded', createBackgroundParticles);

// --- Security Validation ---
function checkPassword() {
    const input = document.getElementById("passwordInput").value;
    const error = document.getElementById("loginError");
    
    if (input === CONFIG.password) {
        error.style.display = "none";
        
        // Music Trigger safely handled on interaction frame
        const music = document.getElementById("bgMusic");
        if(music) {
            music.play().catch(() => console.log("Audio contextual trigger queue active."));
        }

        nextStage(1);
        
        // Auto-transfer screen transition
        setTimeout(() => { nextStage(2); }, 3000);
    } else {
        error.style.display = "block";
        // Shake card effect
        const entryCard = document.querySelector(".entry-card");
        entryCard.style.animation = "none";
        setTimeout(() => { entryCard.style.animation = "floatBalloons 0.15s 3 alternate"; }, 10);
    }
}

// --- Navigation Engine ---
function nextStage(stageNum) {
    document.querySelectorAll('.stage').forEach(s => s.classList.remove('active-stage'));
    const targetedStage = document.getElementById(`stage${stageNum}`);
    if(targetedStage) {
        targetedStage.classList.add('active-stage');
    }
    
    // Continuous celebratory confetti waves if entering Stage 7 or Stage 8
    if (stageNum === 7 || stageNum === 8) {
        if (typeof confetti === 'function') {
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        }
    }
}

// --- Avoidance Button Interaction ---
function dodgeButton() {
    const noBtn = document.getElementById("noBtn");
    
    const randomX = Math.floor(Math.random() * 160) - 80;
    const randomY = Math.floor(Math.random() * 80) - 40;
    
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// --- Balloon Mini Game Interface ---
function popBalloon(element, word) {
    element.style.transform = "scale(0)";
    element.style.opacity = "0";
    element.style.pointerEvents = "none";
    
    // Confetti pop explosion sound simulation
    if (typeof confetti === 'function') {
        confetti({ particleCount: 25, spread: 50, origin: { y: 0.6 } });
    }
    
    revealedWords.push(word);
    document.getElementById("revealMessage").innerText = revealedWords.join(" ");
    
    poppedCount++;
    if (poppedCount === 4) {
        if (typeof confetti === 'function') {
            confetti({ particleCount: 120, spread: 80 });
        }
        document.getElementById("balloonNextBtn").style.display = "inline-block";
    }
}

// --- Interactive Candle Function ---
function blowCandle() {
    document.getElementById("flame").style.transform = "translateX(-50%) scale(0)";
    setTimeout(() => { document.getElementById("flame").style.display = "none"; }, 300);
    document.getElementById("blowBtn").style.display = "none";
    
    document.getElementById("wishText").style.display = "block";
    if (typeof confetti === 'function') {
        confetti({ particleCount: 60, spread: 70 });
    }
}

// --- Envelope Physics Transition Animation ---
function openEnvelope() {
    const topFlap = document.getElementById("topFlap");
    const paper = document.querySelector(".env-paper");
    
    topFlap.classList.add("open-flap");
    
    setTimeout(() => {
        paper.classList.add("lift-paper");
    }, 400);

    setTimeout(() => {
        document.getElementById("envelope").style.display = "none";
        document.getElementById("paperLetter").style.display = "block";
        runTypewriter();
    }, 1200);
}

// --- Typewriter Dynamic Printer ---
function runTypewriter() {
    const target = document.getElementById("typewriterTarget");
    target.innerHTML = "";
    let index = 0;
    
    function type() {
        if (index < CONFIG.letterText.length) {
            let char = CONFIG.letterText.charAt(index);
            target.innerHTML += (char === "\n") ? "<br>" : char;
            index++;
            setTimeout(type, 40);
        } else {
            document.getElementById("letterNextBtn").style.display = "inline-block";
        }
    }
    type();
}

// --- Final Celebration Reveal ---
function openFinalGift() {
    document.getElementById("giftBox").style.display = "none";
    document.getElementById("finalTitle").style.display = "none";
    document.getElementById("finalSub").style.display = "none";
    
    // Infinite stream loops
    var duration = 4 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10 };

    function randomInRange(min, max) { return Math.random() * (max - min) + min; }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        var particleCount = 50 * (timeLeft / duration);
        if (typeof confetti === 'function') {
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }
    }, 250);

    document.getElementById("finalContent").style.display = "block";
}

// --- Reset / Replay System Engine ---
function restartExperience() {
    poppedCount = 0;
    revealedWords = [];
    document.getElementById("revealMessage").innerText = "";
    document.getElementById("balloonNextBtn").style.display = "none";
    
    // Reset balloons
    document.querySelectorAll('.balloon').forEach(b => {
        b.style.transform = "";
        b.style.opacity = "";
        b.style.pointerEvents = "";
    });
    
    document.getElementById("flame").style.display = "block";
    setTimeout(() => { document.getElementById("flame").style.transform = "translateX(-50%) scale(1)"; }, 10);
    document.getElementById("blowBtn").style.display = "inline-block";
    document.getElementById("wishText").style.display = "none";
    
    const topFlap = document.getElementById("topFlap");
    const paper = document.querySelector(".env-paper");
    topFlap.classList.remove("open-flap");
    paper.classList.remove("lift-paper");
    document.getElementById("envelope").style.display = "block";
    document.getElementById("paperLetter").style.display = "none";
    document.getElementById("typewriterTarget").innerHTML = "";
    document.getElementById("letterNextBtn").style.display = "none";
    
    document.getElementById("giftBox").style.display = "inline-block";
    document.getElementById("finalTitle").style.display = "block";
    document.getElementById("finalSub").style.display = "block";
    document.getElementById("finalContent").style.display = "none";
    
    nextStage(2);
}
