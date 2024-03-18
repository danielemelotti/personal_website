import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import { targetElements, defaultProps } from "./data/scrollRevealConfig";

initScrollReveal(targetElements, defaultProps);
initTiltEffect();

const heroTitle = document.querySelector('.hero-title');
const staticText = heroTitle.innerHTML; // Get the existing HTML
const phrases = [
  "Welcome to my website, remodeled for today's interview with PIC's Hiring Team!",
  "Thank you for giving me the opportunity to present myself and my projects today",
];
const finalLine = "Now, let's get started!"

let phraseIndex = 0;
let charIndex = 0; // Start from the beginning of the first phrase
let isTyping = true; // Start with typing effect

function typewriteEffect() {
  if (phraseIndex < phrases.length) {
    if (isTyping) {
      // Typing
      if (charIndex < phrases[phraseIndex].length) {
        heroTitle.innerHTML = staticText + '<span class="dynamic-text">' + phrases[phraseIndex].substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typewriteEffect, 45); // Typing speed
      } else {
        // Once finished typing a phrase, start untyping after a short delay
        isTyping = false;
        setTimeout(typewriteEffect, 1500); // Delay before untyping
      }
    } else {
      // Untyping
      if (charIndex > 0) {
        charIndex--;
        heroTitle.innerHTML = staticText + '<span class="dynamic-text">' + phrases[phraseIndex].substring(0, charIndex);
        setTimeout(typewriteEffect, 15); // Untyping speed (5 times faster)
      } else {
        // Once finished untyping, move to the next phrase or the final line
        phraseIndex++;
        if (phraseIndex < phrases.length) {
          isTyping = true;
          setTimeout(typewriteEffect, 500); // Delay before typing next phrase
        } else {
          // Start typing the final line
          charIndex = 0; // Reset for finalLine
          setTimeout(typeFinalLine, 500); // Delay before starting finalLine
        }
      }
    }
  }
}

function typeFinalLine() {
  if (charIndex < finalLine.length) {
    heroTitle.innerHTML = staticText + '<span class="final-line">' + finalLine.substring(0, charIndex + 1) + '</span>'; // Use the new class
    charIndex++;
    setTimeout(typeFinalLine, 100); 
  }
  // No need to call setTimeout here again, it stops after finalLine is complete
}

// Initial call
typewriteEffect();