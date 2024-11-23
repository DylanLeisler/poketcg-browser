// classes/card.js

class Card {
    constructor({
        id,
        name,
        supertype,
        subtypes,
        level,
        hp,
        types,
        evolvesFrom,
        abilities,
        attacks,
        weaknesses,
        retreatCost,
        convertedRetreatCost,
        set,
        number,
        artist,
        rarity,
        flavorText,
        nationalPokedexNumbers
    }) {
        this.id = id;
        this.name = name;
        this.supertype = supertype;
        this.subtypes = subtypes;
        this.level = level;
        this.hp = hp;
        this.types = types;
        this.evolvesFrom = evolvesFrom;
        this.abilities = abilities;
        this.attacks = attacks;
        this.weaknesses = weaknesses;
        this.retreatCost = retreatCost;
        this.convertedRetreatCost = convertedRetreatCost;
        this.set = set;
        this.number = number;
        this.artist = artist;
        this.rarity = rarity;
        this.flavorText = flavorText;
        this.nationalPokedexNumbers = nationalPokedexNumbers;
    }

    // Optional: Add a method to display card information
    displayInfo() {
        console.log(`Card Name: ${this.name}`);
        console.log(`ID: ${this.id}`);
        console.log(`HP: ${this.hp}`);
        console.log(`Type: ${this.types.join(', ')}`);
    }
}

// Export the Card class so it can be imported in other files
export default Card;


// Example usage
// Assuming `matchingCard` is the result of extracting a card from extractCardsWithId() function:
const matchingCard = {
    "id": "base1-1",
    "name": "Alakazam",
    "supertype": "Pokémon",
    "subtypes": [
        "Stage 2"
    ],
    "level": "42",
    "hp": "80",
    "types": [
        "Psychic"
    ],
    "evolvesFrom": "Kadabra",
    "abilities": [
        {
            "name": "Damage Swap",
            "text": "As often as you like during your turn (before your attack), you may move 1 damage counter from 1 of your Pokémon to another as long as you don't Knock Out that Pokémon. This power can't be used if Alakazam is Asleep, Confused, or Paralyzed.",
            "type": "Pokémon Power"
        }
    ],
    "attacks": [
        {
            "name": "Confuse Ray",
            "cost": [
                "Psychic",
                "Psychic",
                "Psychic"
            ],
            "convertedEnergyCost": 3,
            "damage": "30",
            "text": "Flip a coin. If heads, the Defending Pokémon is now Confused."
        }
    ],
    "weaknesses": [
        {
            "type": "Psychic",
            "value": "×2"
        }
    ],
    "retreatCost": [
        "Colorless",
        "Colorless",
        "Colorless"
    ],
    "convertedRetreatCost": 3,
    "set": {
        "id": "base1",
        "name": "Base",
        "series": "Base",
        "printedTotal": 102,
        "total": 102,
        "legalities": {
            "unlimited": "Legal"
        },
        "ptcgoCode": "BS",
        "releaseDate": "1999/01/09",
        "updatedAt": "2022/10/10 15:12:00",
        "images": {
            "symbol": "https://images.pokemontcg.io/base1/symbol.png",
            "logo": "https://images.pokemontcg.io/base1/logo.png"
        }
    },
    "number": "1",
    "artist": "Ken Sugimori",
    "rarity": "Rare Holo",
    "flavorText": "Its brain can outperform a supercomputer. Its intelligence quotient is said to be 5000.",
    "nationalPokedexNumbers": [
        65
    ]
};

