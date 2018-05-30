let fs = require('fs');

/**
 * Imports the book and splits contents by word.
 * @param filePath 
 */
const parseBook = (filePath) => {
    const string = fs.readFileSync(filePath, 'utf-8');
    const words = splitByWord(string);
    return words;
};

/**
 * Finds all unique occurences of every word in the array passed.
 * @param words
 */
const getOccurences = (words) => {
    let map = {};
    for(let x=0; x<words.length; x++) {
        // Check if this word has already been counted
        if(!map.hasOwnProperty(words[x])) {
            let occurenceCount = 0;
            // Lets go through each word and search occurences
            for(let y=0; y<words.length; y++) {
                if(words[x] === words[y]) {
                    occurenceCount++;
                }
            }
            // Set the word in the map and move on to next word
            map[words[x]] = occurenceCount;
        }
    }
    return map;
};

/**
 * Reduce all arrays into one while retaining values.
 * @param payload 
 */
const reduceOccurences = (payload) => {
    // Take the first array (lets add to this one)
    if(!payload) {
        return [];
    }
    let mergedPayload = {};
    // Will iterate the number of processes run (4)
    for(let x=0; x<payload.length; x++) {
        const keys = Object.keys(payload[x]);
        for(let y=0; y<keys.length; y++) {
            if(mergedPayload.hasOwnProperty(keys[y])) {
                mergedPayload[keys[y]] += payload[x][keys[y]];
            } else {
                mergedPayload[keys[y]] = payload[x][keys[y]]; 
            }
        }
    }
    return mergedPayload;
}

/**
 * Splits string into readable words and numbers.
 * @param string 
 */
const splitByWord = (string) => {
    const removedLines = string.replace(/\n|\r/g, ' ');
    const splitSpace = removedLines.split(' ');
    const sanitizedWords = splitSpace
        .map(word => {
            word = word.replace(/[&\/\\#,+()$~%.';":*”“\-?<>{}]/g, '').toLowerCase();
            return word;
        })
        .filter(word => {
            return word.length >= 2;
        });
    
    return sanitizedWords;
};

module.exports = {
    parseBook: parseBook,
    getOccurences: getOccurences,
    reduceOccurences, reduceOccurences
}