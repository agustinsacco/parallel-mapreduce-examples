
let mapReduce = require('parallel-mapreduce');
let fs = require('fs');
let { parseBook, getOccurences, reduceOccurences } = require('./helper.js');

const words = parseBook('./Brain Theory and Neural Networks.txt');

console.time('Parallel Process Time');
mapReduce(words, getOccurences, reduceOccurences, { workers: 4 })
    .then(result => {
        console.log('------ Multi Process Results -------');
        console.log('"computers" count: ' + result.computers);
        console.log('"are" count: ' + result.are);
        console.log('"great" count: ' + result.great);
        console.timeEnd('Parallel Process Time');
    })
    .catch(err => {
        console.log(err);
    });