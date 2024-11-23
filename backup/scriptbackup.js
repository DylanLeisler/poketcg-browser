const BENCH_SIZE = 5;
const NUM_OF_PRIZES = 6;

document.addEventListener('DOMContentLoaded', () => {
    // Attach an event listener to the Start Game button to begin the game when clicked
    const startButton = document.getElementById('start-game');
    if (startButton) {
        startButton.addEventListener('click', () => {
            console.log('Start Game button clicked');
            startGame();
        });
    } else {
        console.error('Start button not found in DOM.');
    }
});
startGame();
// Function to start the game
function startGame() {
    // Log to verify the startGame function is called
    console.log('Initializing game...');

    // Hide the start button container and show the game area
    const startContainer = document.getElementById('start-container');
    const gameContainer = document.getElementById('game-container');

    if (startContainer && gameContainer) {
        startContainer.style.display = 'none';
        gameContainer.style.display = 'block';
    } else {
        console.error('Could not find startContainer or gameContainer in DOM.');
        return;
    }

    // Get the play-area template and board element
    const template = document.getElementById('play-area-template');
    const board = document.getElementById('board');

    if (!template || !board) {
        console.error('Could not find template or board in DOM.');
        return;
    }

    // Create Opponent's play area
    const opponent_area = document.importNode(template.content, true);
    buildPlayArea(opponent_area, 'opponent');

    // Create Center area
    const center_area = document.getElementById('center-area');
    if (center_area) {
        center_area.querySelector('.player-name').textContent = 'Player 1';
        center_area.querySelector('.opponent-name').textContent = 'Opponent';
    } else {
        console.error('Center area not found in DOM.');
    }

    // Create Player 1's play area
    const player_area = document.importNode(template.content, true);
    buildPlayArea(player_area, 'player');

    // Append play areas to the board
    board.appendChild(opponent_area);
    board.appendChild(center_area);
    board.appendChild(player_area);

    // Add click event listener to elements with the class 'deck'
    board.addEventListener('click', async (event) => {
        if (event.target.classList.contains('deck')) {
            console.log('Deck clicked');
            await getCard(); // Run getCard when a 'deck' element is clicked
        }
    });
}

function buildPlayArea(play_area, classNameBase) {
    const className = `${classNameBase}-area`;
    const playAreaElement = play_area.querySelector('.play-area');
    if (!playAreaElement) {
        console.error('Play area element not found in template.');
        return;
    }
    playAreaElement.classList.add(className);

    const active_area = play_area.querySelector('.active-area');
    const bench_area = play_area.querySelector('.bench-area');
    area = play_area.querySelector('.left-play-area');
    const nested_template = play_area.querySelector('#card-slot-template');

    if (nested_template) {
        if (bench_area) {
            createAndAppendTemplate(nested_template, bench_area, BENCH_SIZE);
        }

        if (active_area) {
            const card_slot_fragment = document.importNode(nested_template.content, true);
            const card_slot = card_slot_fragment.querySelector('.card-slot');
            if (card_slot) {
                card_slot.classList.add('active-slot');
            }
            active_area.appendChild(card_slot_fragment);
        }

        if (prize_area) {
            createAndAppendTemplate(nested_template, prize_area, NUM_OF_PRIZES);
        }
    } else {
        console.error('Nested template not found in play area.');
    }
}

// Function to import a template n times and append to a parent
function createAndAppendTemplate(template, parent, n) {
    const fragment = document.createDocumentFragment();
    Array(n).fill().forEach(() => {
        const newNode = document.importNode(template.content, true);
        fragment.appendChild(newNode);
    });
    parent.appendChild(fragment);
}

