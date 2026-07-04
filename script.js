// --- Global Configurations ---
const CONFIG = {
    password: "2907", // Your custom passcode entry
    letterText: "Happy Birthday, Sumaiya! 💖\n\nI don't think words will ever be enough to explain what you mean to me, but today I'll still try. You walked into my life so quietly, yet somehow changed everything so loudly. Since you came into my world, even ordinary days feel softer, happier, and more meaningful. You make everything beautiful! ✨"
};

let poppedCount = 0;
let revealedWords = [];
let slideInterval = null;

// --- Live Background Decoration Particle Engine ---
// --- Live Background Decoration Particle Engine ---
function createBackgroundParticles() {
    const bgContainer = document.getElementById("heartsBg");
    const icons = ['💖', '✨', '💜', '🌸', '💕'];
    
    setInterval(() => {
        const particle = document.createElement("div");
        particle.classList.add("heart-particle");
        particle.innerText = icons[Math.floor(Math.random() * icons.length)];
        
        // Dynamic random positioning and coloring details
        particle.style.left = Math.random() * 100 + "vw";
        particle.style.fontSize = (Math.random() * 20 + 15) + "px";
        particle.style.animationDuration = (Math.random() * 3 + 4) + "s";
        
        // Randomly apply pink vs purple glow aesthetics
        if(Math.random() > 0.5) {
            particle.style.filter = "drop-shadow(0 0 6px #ff6b8b)";
        } else {
            particle.style.filter = "drop-shadow(0 0 6px #9c27b0)";
        }
        
        bgContainer.appendChild(particle);
        
        setTimeout(() => { particle.remove(); }, 7000);
    }, 400);
}
window.onload = createBackgroundParticles;

// --- Security Validation ---
function checkPassword() {
    const input = document.getElementById("passwordInput").value;
    const error = document.getElementById("loginError");
    const entryCard = document.querySelector(".entry-card");
    
    if (input === CONFIG.password) {
        error.style.display = "none";
        
        // Music Trigger safely handled on interaction frame
        const music = document.getElementById("bgMusic");
        music.play().catch(() => console.log("Audio contextual trigger queue active."));

        nextStage(1);
        
        // Auto-transfer screen transition
        setTimeout(() => { nextStage(2); }, 3000);
    } else {
        error.style.display = "block";
        // Shake card effect
        entryCard.classList.remove("shake");
        void entryCard.offsetWidth; // Trigger reflow to restart animation
        entryCard.classList.add("shake");
    }
}

// --- Navigation Engine ---
function nextStage(stageNum) {
    document.querySelectorAll('.stage').forEach(s => s.classList.remove('active-stage'));
    document.getElementById(`stage${stageNum}`).classList.add('active-stage');
    
    // If arriving at the final romantic slideshow, launch the photo engine
    if (stageNum === 8) {
        startPhotoSlideshow();
    } else {
        stopPhotoSlideshow();
    }
}

// --- Avoidance Button Interaction ---
function dodgeButton() {
    const noBtn = document.getElementById("noBtn");
    const container = noBtn.parentElement;
    const rect = container.getBoundingClientRect();
    
    const randomX = Math.floor(Math.random() * (rect.width - 80)) - (rect.width / 3);
    const randomY = Math.floor(Math.random() * 60) - 30;
    
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// --- Balloon Mini Game Interface ---
function popBalloon(element, word) {
    element.style.transform = "scale(0)";
    element.style.opacity = "0";
    element.style.pointerEvents = "none";
    
    // Confetti pop explosion sound simulation
    confetti({ particleCount: 25, spread: 50, origin: { y: 0.6 } });
    
    revealedWords.push(word);
    document.getElementById("revealMessage").innerText = revealedWords.join(" ");
    
    poppedCount++;
    if (poppedCount === 4) {
        confetti({ particleCount: 120, spread: 80 });
        document.getElementById("balloonNextBtn").style.display = "inline-block";
    }
}

// --- Interactive Candle Function ---
function blowCandle() {
    document.getElementById("flame").style.transform = "scale(0)";
    setTimeout(() => { document.getElementById("flame").style.display = "none"; }, 300);
    document.getElementById("blowBtn").style.display = "none";
    
    document.getElementById("wishText").style.display = "block";
    confetti({ particleCount: 60, spread: 70 });
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
    }, 1400);
}

// --- Typewriter Dynamic Printer ---
function runTypewriter() {
    const target = document.getElementById("typewriterTarget");
    target.innerHTML = ""; // Clear text before typing
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
    
    var duration = 4 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10 };

    function randomInRange(min, max) { return Math.random() * (max - min) + min; }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    document.getElementById("finalContent").style.display = "block";
}

// --- Stage 8 Crossfade Image Loop ---
function startPhotoSlideshow() {
    stopPhotoSlideshow();
    const slides = document.querySelectorAll(".slide-img");
    let currentSlide = 0;
    
    slideInterval = setInterval(() => {
        slides[currentSlide].classList.remove("active-slide");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active-slide");
    }, 3500); // Transitions automatically every 3.5 seconds
}

function stopPhotoSlideshow() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

// --- Reset / Replay System Engine ---
// --- Reset / Replay System Engine ---
function restartExperience() {
    poppedCount = 0;
    revealedWords = [];
    document.getElementById("revealMessage").innerText = "";
    document.getElementById("balloonNextBtn").style.display = "none";
    
    document.getElementById("flame").style.display = "block";
    document.getElementById("flame").style.transform = "scale(1)";
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
    
    // Explicitly transition back smoothly[cite: 3]
    nextStage(2);
}
