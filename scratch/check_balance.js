import fs from 'fs';
const content = fs.readFileSync('c:\\Users\\della\\OneDrive\\Escritorio\\seogrowthers\\Nueva carpeta\\Nueva carpeta\\horizons-export-4ae51224-e377-439c-9315-7d2c7f7b11c2\\src\\pages\\blog\\CreatePostPage.jsx', 'utf8');

let braces = 0;
let brackets = 0;
let parens = 0;

for (let i = 0; i < content.length; i++) {
    if (content[i] === '{' ) braces++;
    if (content[i] === '}' ) braces--;
    if (content[i] === '[' ) brackets++;
    if (content[i] === ']' ) brackets--;
    if (content[i] === '(' ) parens++;
    if (content[i] === ')' ) parens--;
}

console.log(`Braces balance: ${braces}`);
console.log(`Brackets balance: ${brackets}`);
console.log(`Parens balance: ${parens}`);
