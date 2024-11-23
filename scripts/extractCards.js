import fs from 'fs';
import path from 'path';
import Card from '../classes/card.js';

export function extractCardsWithId(targetId) {
    return new Promise((resolve, reject) => {
        const directoryPath = path.join('data', 'cards');

        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                reject(err);
                return;
            }

            files.forEach(file => {
                if (path.extname(file) === '.json') {
                    const filePath = path.join(directoryPath, file);

                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            console.error(`Error reading file ${file}:`, err);
                            reject(err);
                            return;
                        }

                        try {
                            const cards = JSON.parse(data);
                            const matchingCards = cards.filter(card => card.id === targetId);

                            if (matchingCards.length > 0) {
                                if (matchingCards.length > 1) {
                                    console.error(`Error: Found more than one matching card in ${file}:`, matchingCards);
                                    reject(new Error('More than one matching card found.'));
                                } else {
                                    // Create and return the Card object for the matching card
                                    const cardObject = new Card(matchingCards[0]);
                                    resolve(cardObject);
                                }
                            } else {
                                resolve(null); // No matching card found
                            }
                        } catch (parseError) {
                            console.error(`Error parsing JSON in file ${file}:`, parseError);
                            reject(parseError);
                        }
                    });
                }
            });
        });
    });
}
