import { loadCardsIfNeeded, getCardById } from '../scripts/indexdbInit.js';

const BENCH_SIZE = 5;
const NUM_OF_PRIZES = 6;

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installButton = document.getElementById('install-button');
  if (installButton) {
      installButton.style.display = 'block';

      installButton.addEventListener('click', () => {
          installButton.style.display = 'none';
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((choiceResult) => {
              if (choiceResult.outcome === 'accepted') {
                  console.log('User accepted the install prompt');
              } else {
                  console.log('User dismissed the install prompt');
              }
              deferredPrompt = null;
          });
      });
  }
  else
    console.log("ERROR")
});

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Load cards into IndexedDB if needed
    await loadCardsIfNeeded();

    // Set up game board
    setupBoard();

    // Example: Fetch a card with ID 'base1-1'
    const card = await getCardById('base1-1');
    if (card) {
        console.log('Fetched card:', card);
    } else {
        console.log('Card not found');
    }
});

// Function to create and append card slots using template
function createAndAppendTemplate(template, parent, n) {
    if (!template || !parent) return;

    const fragment = document.createDocumentFragment();
    Array(n).fill().forEach(() => {
        const newNode = document.importNode(template.content, true);
        fragment.appendChild(newNode);
    });
    parent.appendChild(fragment);
}

// Function to set up the game board
function setupBoard() {
    // const playArea = document.getElementById('play-area');
    // if (!playArea) return;

    // const benchArea = document.createElement('div');
    // benchArea.classList.add('bench-area');

    // const cardTemplate = document.getElementById('card-template');
    // if (cardTemplate) {
    //     createAndAppendTemplate(cardTemplate, benchArea, BENCH_SIZE);
    // }

    // playArea.appendChild(benchArea);
    console.log("check")
}

// Register the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, (err) => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
