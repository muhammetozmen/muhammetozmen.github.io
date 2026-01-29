const glitchPhrases = [
    "SYSTEM_ERROR_0x92",
    "WAKE_UP_NEO",
    "SIGNAL_INTERRUPTED...",
    "01001000 01001001",
    "NULL_POINTER_EXCEPTION",
    "LOOK_BEHIND_YOU",
    "ESENLIKLER_EFENDIM_NASILSINIZ?",
    "CONNECTING_TO_HOST...",
    "ACCESS_DENIED",
    "KERNEL_PANIC",
    "MARDINLI_GUZEL_YARIM_INAN_SANA_HAYRANIM_YOLUNA_FEDA_OLSUN",
    "ozmenos_v1.0.exe"
];

// --- Marquee Glitch Logic ---
function triggerTextGlitch() {
    const marqueeText = document.querySelector('.glitch-marquee');
    if (!marqueeText) return;

    if (!marqueeText.dataset.originalHtml) {
        marqueeText.dataset.originalHtml = marqueeText.innerHTML;
    }

    if (Math.random() < 0.3) {
        const randomPhrase = glitchPhrases[Math.floor(Math.random() * glitchPhrases.length)];
        marqueeText.style.color = Math.random() > 0.5 ? '#ff0000' : '#00ff00';
        marqueeText.style.fontFamily = '"Press Start 2P", monospace';
        marqueeText.style.fontSize = "0.7em"; // Reduce size to prevent layout shift
        marqueeText.style.lineHeight = "1.5";
        marqueeText.innerHTML = randomPhrase.repeat(5);

        setTimeout(() => {
            marqueeText.innerHTML = marqueeText.dataset.originalHtml;
            marqueeText.style.color = '';
            marqueeText.style.fontFamily = '';
            marqueeText.style.fontSize = '';
            marqueeText.style.lineHeight = '';
        }, Math.random() * 400 + 100);
    } else {
        marqueeText.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        marqueeText.style.textShadow = `${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 5px rgba(255,255,255,0.8)`;

        setTimeout(() => {
            marqueeText.style.color = '';
            marqueeText.style.textShadow = '';
        }, 200);
    }
}

function startGlitchLoop() {
    const nextGlitch = Math.random() * 6000 + 2000;
    setTimeout(() => {
        triggerTextGlitch();
        startGlitchLoop();
    }, nextGlitch);
}

// --- Smooth Typewriter Animation for Description ---
const typewriterPhrases = [
    "This is my personal space on the internet.",
    "Welcome to the digital void.",
    "Powered by OZMENOS v1.0.",
    "Est. 2001 - Still Loading...",
    "Searching for signal...",
    "Esenlikler Efendim."
];

class Typewriter {
    constructor(elementId, phrases) {
        this.element = document.getElementById(elementId);
        this.phrases = phrases;
        this.currentPhraseIndex = 0;
        this.isDeleting = false;
        this.txt = '';

        setTimeout(() => this.tick(), 1000);
    }

    tick() {
        if (!this.element) return;

        const fullTxt = this.phrases[this.currentPhraseIndex];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.innerHTML = this.txt + '<span style="border-right: 2px solid #666; animation: blink 0.7s infinite;">&nbsp;</span>';

        let delta = 100 - Math.random() * 50;
        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
            delta = 500;
        }

        setTimeout(() => this.tick(), delta);
    }
}

// --- Startup Sequence Logic ---
function runStartupSequence() {
    const el = document.getElementById('sys-status');
    if (!el) return;

    // 0s: Offline (Red) - Ensure style matches
    el.innerText = "Offline";
    el.style.color = "#ff0000";

    // 2s: Scanning... (Yellow)
    setTimeout(() => {
        el.innerText = "Scanning...";
        el.style.color = "#ffff00";
    }, 2000);

    // 7s (2+5): Online (Green)
    setTimeout(() => {
        el.innerText = "Online";
        el.style.color = "#00ff00";
    }, 7000);
}

document.addEventListener('DOMContentLoaded', () => {
    // Start marquee glitch
    startGlitchLoop();

    // Start Typewriter
    if (document.getElementById('typing-desc')) {
        new Typewriter('typing-desc', typewriterPhrases);
    }

    // Start Sequence
    runStartupSequence();
});

// --- Live Visitor Stats Logic ---
function initLiveStats() {
    const onlineEl = document.getElementById('users-online');
    const hitsEl = document.getElementById('total-hits');
    
    setInterval(() => {
       if(onlineEl) {
           let count = parseInt(onlineEl.innerText);
           count += Math.random() > 0.5 ? 1 : -1;
           if(count < 1) count = 1;
           if(count > 15) count = 15;
           onlineEl.innerText = count.toString().padStart(2, '0');
       }
    }, 5000); // Every 5s
    
    setInterval(() => {
        if(hitsEl) {
            let hits = parseInt(hitsEl.innerText);
            hits++;
            hitsEl.innerText = hits.toString().padStart(6, '0');
        }
    }, 8000 + Math.random() * 5000); // Random interval
}

document.addEventListener('DOMContentLoaded', initLiveStats);
