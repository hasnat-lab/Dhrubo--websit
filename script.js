// --- Sticky Navbar Effect ---
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.glass-nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// --- Mobile Menu Toggle (Basic) ---
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '70px';
    navLinks.style.right = '5%';
    navLinks.style.background = 'rgba(11, 15, 23, 0.95)';
    navLinks.style.padding = '20px';
    navLinks.style.borderRadius = '15px';
    navLinks.style.border = '1px solid rgba(255,255,255,0.08)';
});

// --- Typing Effect ---
const typedTextSpan = document.querySelector(".typed-text");
const textArray = [" Student", "FreeFire Gammer", "Sports Enthusiast"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; 
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if(textArray.length) setTimeout(type, newTextDelay + 250);
});

// --- Stats Counter Animation ---
const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the slower

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + "+";
            }
        };
        updateCount();
    });
}

// Intersection Observer for running counter only when section is visible
const statsSection = document.querySelector('#about');
const observer = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting){
        animateCounters();
        observer.disconnect(); // Run only once
    }
}, { threshold: 0.5 });

if(statsSection){
    observer.observe(statsSection);
}

// --- 3D Tilt Effect for Project Cards (Vanilla JS) ---
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.transition = 'transform 0.5s ease';
    });
    
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none'; // Remove transition for smooth tracking
    });
});

// --- Discord Username Copy to Clipboard ---
const discordBtn = document.getElementById('discord-copy-btn');
if (discordBtn) {
    discordBtn.addEventListener('click', () => {
        const discordUsername = 'dhrubomvp_68944';
        navigator.clipboard.writeText(discordUsername).then(() => {
            // Create a temporary tooltip to show success message
            const tooltip = document.createElement('span');
            tooltip.textContent = 'Username Copied!';
            tooltip.style.position = 'absolute';
            tooltip.style.background = '#4CAF50';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '5px';
            tooltip.style.bottom = '120%'; // Position above the button
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.opacity = '0';
            tooltip.style.transition = 'opacity 0.3s';
            discordBtn.appendChild(tooltip);
            setTimeout(() => { tooltip.style.opacity = '1'; }, 10); // Fade in
            setTimeout(() => { tooltip.remove(); }, 2000); // Remove after 2 seconds
        }).catch(err => {
            console.error('Failed to copy username: ', err);
        });
    });
}