
let { mapReduce } = require('parallel-mapreduce');
let fs = require('fs');
let { parseBook, getOccurences, reduceOccurences } = require('./helper.js');

const words = parseBook('./Brain Theory and Neural Networks.txt');

console.time('Single Process Time');
const result = getOccurences(words);
console.log('------ Single Process Results -------');
console.log('"computers" count: ' + result.computers);
console.log('"are" count: ' + result.are);
console.log('"great" count: ' + result.great);
console.timeEnd('Single Process Time');
