const fs = require('fs');
const process = require('process');

fs.open('./02-write-file/text.txt', 'w', (err) => err && console.error(err));
const writeStream = fs.createWriteStream('./02-write-file/text.txt');
console.log('Напишите что-нибудь');

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on('line', (input) => {
  writeStream.write(input + '\n');

  if (input.toLowerCase() === 'exit') {
    console.log('Текст записан.');
    writeStream.end();
    process.exit();
  }
});
process.on('exit', () => {
  console.log('Пока!');
});
