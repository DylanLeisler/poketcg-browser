import Dexie from '../node_modules/dexie/dist/dexie.mjs'; // Make sure this path is correct

// Create the database and a table for cards
const db = new Dexie('CardDatabase');
db.version(1).stores({
    cards: 'id, name, set' // Index by ID, name, and set
});

// Function to add card data to IndexedDB
export async function addCardsToDatabase(cards) {
    try {
        await db.cards.bulkPut(cards);
        console.log('Cards added to the database');
    } catch (error) {
        console.error('Failed to add cards:', error);
    }
}

// Load cards from a JSON file into IndexedDB
export async function loadCards() {
    try {
        const response = await fetch('./data/all_cards.json');
        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
        
        const cards = await response.json();
        console.log('Cards fetched from JSON:', cards); // Added log for debugging
        await addCardsToDatabase(cards);
    } catch (error) {
        console.error('Failed to load cards:', error);
    }
}

// Load cards only if IndexedDB is empty
export async function loadCardsIfNeeded() {
    try {
        const count = await db.cards.count();
        if (count === 0) {
            console.log('No cards found in the database, loading cards...');
            await loadCards();
        } else {
            console.log('Cards are already in the database.');
        }
    } catch (error) {
        console.error('Error checking or loading cards in IndexedDB:', error);
    }
}

// Fetch a specific card from IndexedDB
export async function getCardById(cardId) {
    try {
        const card = await db.cards.get(cardId);
        if (!card) {
            console.warn(`Card with ID ${cardId} not found in the database.`);
        }
        return card;
    } catch (error) {
        console.error('Error fetching card by ID:', error);
    }
}
