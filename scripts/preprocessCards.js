import fs from 'fs';
import path from 'path';

// Directory where your JSON files are
const directoryPath = path.join('data', 'cards');

// Output file to store all card data
const outputFilePath = path.join('data', 'all_cards.json');

function preprocessCardData() {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        let allCards = [];
        files.forEach(file => {
            if (path.extname(file) === '.json') {
                const filePath = path.join(directoryPath, file);
                const data = fs.readFileSync(filePath, 'utf8');
                try {
                    const cards = JSON.parse(data);
                    allCards = allCards.concat(cards);
                } catch (parseError) {
                    console.error(`Error parsing JSON in file ${file}:`, parseError);
                }
            }
        });

        // Write the combined card data to a new file
        fs.writeFileSync(outputFilePath, JSON.stringify(allCards, null, 2));
        console.log(`Successfully saved all card data to ${outputFilePath}`);
    });
}

preprocessCardData();
