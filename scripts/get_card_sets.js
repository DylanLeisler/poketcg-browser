import pokemon from "pokemontcgsdk";
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Now, you can access your API_KEY from process.env
const apiKey = process.env.API_KEY;

console.log(`Your API key is: ${apiKey}`);


pokemon.configure({apiKey: apiKey})


const sets = await pokemon.set.all();
sets.forEach(set => {
    console.log(set.id);
    console.log(`Attempting to download ${set.id}`);
    pull_set(set.id)
});


function pull_set(set_id) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Function to create directories and save card data
    pokemon.card.all({ q: `set.id:${set_id}`, orderBy: 'id' })
        .then((cards) => {
            console.log(cards); // Log the response to see its structure


            // Convert the cards to a JSON string
            const jsonString = JSON.stringify(cards, null, 2); // Use indentation of 2 spaces for readability


            // Define the path where the JSON will be saved
            const filePath = path.join(__dirname, '..', 'data', 'cards', `${set_id}_cards.json`);

            // Check if the file already exists
            if (fs.existsSync(filePath)) {
                console.log(`File ${set_id}_cards.json already exists. Skipping API call.`);
                return; // End the function gracefully if the file exists
            }

            // Create directories if they don't exist
            fs.mkdir(path.dirname(filePath), { recursive: true }, (err) => {
                if (err) {
                    console.error('Error creating directory:', err);
                } else {
                    // Write the JSON string to the file
                    fs.writeFile(filePath, jsonString, (err) => {
                        if (err) {
                            console.error('Error writing to file:', err);
                        } else {
                            console.log(`Successfully saved card data to ${set_id}.json`);
                        }
                    });
                }
            });
        })
        .catch((error) => {
            console.error('Error fetching cards:', error);
        });
}
// pokemon.card.find('base1-4')
// .then(card => {
//     console.log(card) // "Charizard"
//     console.log(card.attacks[0].cost);
// })


// pokemon.set.find('base1')
// .then(set => {
//     console.log(set) // "Base"
//     console.log("test")
// })

